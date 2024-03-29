const update = async (data, user, parent_session) => {

    // 1. Validate data
    const update_user_validator = require('../../../validators/requests/api/user/update')
    try {
        await update_user_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/entities/user')
    try {
        data.query = authorizer(data.query, 'updatable', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }
    const filter = data.query

    // 3. Authorize update
    try {
        data.body = authorizer(data.body, 'update', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }
    const update = data.body

    // 4. Start session and transaction if they don't exist
    const User_Model = require('../../../models/User')
    const session = parent_session ?? await User_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const users = (await User_Model.find(
        filter,
        null,
        { session: session }
    )).map(u => ({ old: u.$clone(), new: u }))

    if (users.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200,
            data: 'no_documents_found_to_update',
        }
    }

    // 6. Update locally
    // We need to go in a topological order.
    // For every field, we deal with the field and its dependencies, but not its dependents.
    for (const u of users) {
        const current_update = structuredClone(update)
        let current_remove = []

        // email cannot be changed
        // username CAN be changed, OK
        // hashed_password CAN be changed, OK

        // roles: if it is string, then convert modifier string to an actual new roles array
        if ('roles' in current_update && typeof current_update.roles === 'string') {
            const role_modifiers = current_update.roles.split(' ')
            const roles_to_add = role_modifiers.filter(role_modifier => role_modifier[0] === '+').map(role_modifier => role_modifier.substring(1))
            const roles_to_remove = role_modifiers.filter(role_modifier => role_modifier[0] === '-').map(role_modifier => role_modifier.substring(1))
            current_update.roles = u.old.roles.filter(role => !roles_to_remove.includes(role)).concat(roles_to_add)
        }
        // full_name
        if ('roles' in current_update && !current_update.roles.some(role => ['competitor', 'judge'].includes(role))) {
            current_remove = current_remove.concat(['full_name'])
        }
        // contact_phone_number
        if ('roles' in current_update && !current_update.roles.some(role => ['competitor'].includes(role))) {
            current_remove = current_remove.concat(['contact_phone_number'])
        }
        // billing_information
        if ('roles' in current_update && !current_update.roles.some(role => ['competitor'].includes(role))) {
            current_remove = current_remove.concat(['billing_information'])
        }
        // association_member
        if ('roles' in current_update && !current_update.roles.some(role => ['competitor'].includes(role))) {
            current_remove = current_remove.concat(['association_member'])
        }
        // registration_temporary is OK
        // confirm_registration_id
        if ('registration_temporary' in current_update && u.old.registration_temporary === true && current_update.registration_temporary === false) {
            current_remove = current_remove.concat(['confirm_registration_id'])
        }
        // table_leader: if it is string, then convert modifier string to an actual new table_leader array
        if ('table_leader' in current_update && typeof current_update.table_leader === 'string') {
            const table_leader_modifiers = current_update.table_leader.split(' ')
            const competition_ids_to_add = table_leader_modifiers.filter(table_leader_modifier => table_leader_modifier[0] === '+').map(table_leader_modifier => table_leader_modifier.substring(1))
            const competition_ids_to_remove = table_leader_modifiers.filter(table_leader_modifier => table_leader_modifier[0] === '-').map(table_leader_modifier => table_leader_modifier.substring(1))
            current_update.table_leader = u.old.table_leader?.filter(competition_id => !competition_ids_to_remove.includes(competition_id)).concat(competition_ids_to_add) ?? competition_ids_to_add
        }
        if ('roles' in current_update && !current_update.roles.some(role => ['judge'].includes(role))) {
            current_remove = current_remove.concat(['table_leader'])
        }
        // arrived
        if ('arrived' in current_update && typeof current_update.arrived === 'string') {
            const arrived_modifiers = current_update.arrived.split(' ')
            const competition_ids_to_add = arrived_modifiers.filter(arrived_modifier => arrived_modifier[0] === '+').map(arrived_modifier => arrived_modifier.substring(1))
            const competition_ids_to_remove = arrived_modifiers.filter(arrived_modifier => arrived_modifier[0] === '-').map(arrived_modifier => arrived_modifier.substring(1))
            current_update.arrived = u.old.arrived?.filter(competition_id => !competition_ids_to_remove.includes(competition_id)).concat(competition_ids_to_add) ?? competition_ids_to_add
        }
        if ('roles' in current_update && !current_update.roles.some(role => ['judge'].includes(role))) {
            current_remove = current_remove.concat(['arrived'])
        }

        u.new.set(current_update)
        for (const key of current_remove) {
            u.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const user_validator = require('../../../validators/schemas/User')
    try {
        const validator_promises = users.map((u) =>
            user_validator.validateAsync(u.new)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 8. Check dependencies: Ask all dependencies if this update is possible.
    const dependencies = ['allowed_role', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/user`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(users, user, session))
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 403,
            data: unapproved.reason
        }
    }

    // 9. Check collection integrity

    // We need uniqueness of email, username and confirm_registration_id
    // But we only need to check uniqueness of 'username' because it is the only field that can be changed.
    const new_usernames = users.map(u => u.new.username)
    const unique_new_usernames = [...new Set(new_usernames)]
    if (new_usernames.length !== unique_new_usernames.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 409,
            data: 'provided_new_usernames_are_not_unique',
        }
    }
    if (await User_Model.exists({
        _id: { $nin: users.map(u => u.new._id.toString()) },
        username: { $in: unique_new_usernames },
    }, { session: session })
    ) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 409,
            data: 'at_least_one_provided_username_already_exists_in_db',
        }
    }

    // You cannot change the number of organizers from N>0 to N=0
    const organizers_in_total = await User_Model.find(
        { roles: { $in: ['organizer'] } },
        null,
        { session: session }
    )
    const users_who_lose_their_organizer_role = users.filter(u => u.old.roles.includes('organizer') && !u.new.roles.includes('organizer'))
    if (organizers_in_total.length > 0 && organizers_in_total.length === users_who_lose_their_organizer_role.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 403,
            data: 'it_is_not_allowed_to_remove_the_last_organizers_organizer_role',
        }
    }

    // 10. Save updated documents
    await User_Model.bulkSave(users.map(u => u.new), { session: session })

    // 11. Update dependents
    // Dependents are: Active_Password_Reset, Rating, Product
    const remove_rating = require('../rating/remove')
    const remove_product = require('../product/remove')

    const update_dependent_promises = []

    for (const u of users) {
        // If we remove the role 'judge', all ratings should be removed.
        if (u.old.roles.includes('judge') && !u.new.roles.includes('judge')) {
            update_dependent_promises.push(remove_rating(
                {
                    judge_id: u.old._id.toString()
                },
                user,
                session
            ))
        }
        // If we remove the role 'competitor', all products should be removed.
        if (u.old.roles.includes('competitor') && !u.new.roles.includes('competitor')) {
            update_dependent_promises.push(remove_product(
                {
                    competitor_id: u.old._id.toString()
                },
                user,
                session
            ))
        }

        // If we remove a 'table_leader', nothing happens, so the pictures will remain, because the pictures belong to the Product, not to the Judge.

        // If we remove an 'arrived', nothing happens, so the ratings will remain.
    }

    const update_dependent_results = await Promise.all(update_dependent_promises)
    const failed_operation = update_dependent_results.find(result =>
        !(typeof result.code === 'number' && result.code >= 200 && result.code <= 299)
    )

    if (failed_operation) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return failed_operation
    }

    // 12. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 13. Reply
    return {
        code: 200,
        data: undefined,
    }
}

module.exports = update