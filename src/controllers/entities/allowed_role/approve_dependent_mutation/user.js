const approve_user_mutation = async (users, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(users)) {
        return {
            approved: false,
            reason: 'provided_users_is_not_an_array'
        }
    } else if (users.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!users[0].old && !users[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!users[0].old && users[0].new) {
        action = 'create'
    } else if (!users[0].old && users[0].new) {
        action = 'remove'
    } else if (users[0].old && users[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner Allowed_Role documents into an array
    // Projection should contain the _id, and the fields that are needed to check if User mutation is allowed.
    const user_emails = action === 'create' ?
        users.map(u => u.new.email.toString())
        :
        users.map(u => u.old.email.toString())
    const unique_user_emails = [...new Set(user_emails)]

    const find_allowed_role = require('../find')
    const allowed_roles = (await find_allowed_role(
        {
            filter: {
                email: { $in: unique_user_emails },
            },
            projection: {
                _id: 1,
                email: 1,
                allowed_roles: 1
                // Check if anything else needed!
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on Allowed_Role, is this mutation possible?

    // Not all provided emails should belong to a real Allowed_Role, since Competitors don't need an Allowed_Role document.

    // If we give a role to a User, then that role should be present in his allowed roles.
    const limited_roles = require('../../../../static/limited_roles.json')
    for (const u of users) {
        const old_roles = u.old?.roles ?? []
        const new_roles = u.new?.roles ?? []
        const assigned_limited_roles = new_roles.filter(role => !old_roles.includes(role)).filter(role => limited_roles.includes(role))
        const allowed_limited_roles = allowed_roles.find(allowed_role => allowed_role.email === u.email)?.allowed_roles ?? []

        if (assigned_limited_roles.some(role => !allowed_limited_roles.includes(role))) {
            return {
                approved: false,
                reason: 'failed_attempt_to_assign_a_limited_role_that_is_not_present_in_allowed_roles'
            }
        }
    }

    // 4. Based on Allowed_Role's dependencies, is this mutation possible?
    // The dependencies will only see that Allowed_Role has changed, they won't know anything about User.
    // Allowed_Role has no dependencies.

    // 5. Approve
    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_user_mutation