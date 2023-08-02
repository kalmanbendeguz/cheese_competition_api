const approve_active_password_reset_mutation = async (active_password_resets, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(active_password_resets)) {
        return {
            approved: false,
            reason: 'provided_active_password_resets_is_not_an_array'
        }
    } else if (active_password_resets.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!active_password_resets[0].old && !active_password_resets[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!active_password_resets[0].old && active_password_resets[0].new) {
        action = 'create'
    } else if (!active_password_resets[0].old && active_password_resets[0].new) {
        action = 'remove'
    } else if (active_password_resets[0].old && active_password_resets[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner User documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Active_Password_Reset mutation is allowed.
    const user_ids = action === 'create' ?
        active_password_resets.map(active_password_reset => active_password_reset.new.user_id.toString())
        :
        active_password_resets.map(active_password_reset => active_password_reset.old.user_id.toString())
    const unique_user_ids = [...new Set(user_ids)]

    const find_user = require('../find')
    const users = (await find_user(
        {
            filter: {
                _id: { $in: unique_user_ids },
            },
            projection: {
                _id: 1,
                registration_temporary: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on User, is this mutation possible?
    // All provided user_ids should belong to a real User.
    if (unique_user_ids.length !== users.length) {
        return {
            approved: false,
            reason: 'not_all_provided_user_ids_belong_to_a_real_user'
        }
    }

    // All users must be activated users.
    if (users.some(u => u.registration_temporary === true)) {
        return {
            approved: false,
            reason: 'temporary_user_can_not_have_a_belonging_active_password_reset'
        }
    }

    // 4. Based on User's dependencies, is this mutation possible?
    // The dependencies will only see that User has changed, they won't know anything about Active_Password_Reset.
    const dependencies = ['allowed_role', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../../${dependency}/approve_dependent_mutation/user`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(
            dependency_approver(
                users.map(u => ({ old: u, new: u })),
                user,
                session
            )
        )
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        return unapproved
    }

    // 5. Approve
    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_active_password_reset_mutation