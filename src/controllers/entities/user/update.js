// COMPETITOR, JUDGE, ORGANIZER, RECEIVER, SERVER
module.exports = async (data, user, parent_session) => {

    // 1. Validate data
    const update_user_validator = require('../../../validators/requests/api/user/update')
    try {
        await update_user_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/user')
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
    const session = parent_session ?? await User_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const users = (await User_Model.find(
        filter,
        null,
        { session: session }
    )).map(u => ({ old: structuredClone(u), new: u }))
    if (users.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200, // this will be 200. bc this is not an error.
            data: 'no_documents_found_to_update',
        }
    }

    // 6. Update locally
    // If something needs to be removed from the document, we need to declare it here.
    const remove = [] // Remove that is globally true for all documents
    for (const u of users) {
        const current_update = structuredClone(update)
        let current_remove = structuredClone(remove)

        // email cannot be changed
        // username CAN be changed, OK
        // hashed_password CAN be changed, OK
        // roles
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
        if ('registration_temporary' in current_update && u.old.registration_temporary && !current_update.registration_temporary) { // it can only be false
            current_remove = current_remove.concat(['confirm_registration_id'])
        }
        // table_leader
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

    // 8. Check dependencies: Ask all dependencies if this creation is possible.
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
    // TODO: uniqueness needs to be checked at creation too !! (bc local uniqueness is not checked there, i guess)
    // (and check local uniqueness everywhere else)
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

    // 10. Save updated documents
    await User_Model.bulkSave(users.map(u => u.new), { session: session })

    // 11. Update dependents
    // Dependents are: Active_Password_Reset, Rating, Product
    // An active_password_reset should not be updated.
    // Import dependent mutation controllers
    // create
    // No 'create' dependent controller needs to be imported
    // find
    // No 'find' dependent controller needs to be imported
    // update
    // No 'update' dependent controller needs to be imported
    // remove
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
        // If we remove a 'table_leader', all rating_pictures should be removed from that competition.
        // THIS IS A TODO. EZT ÁT KELL GONDOLNI
        /**
         * remove_rating_picture(
         * {
         *      rating_id: olyan rating, ahol rating.judge_id = judge_id és rating.product.competition_id = removed_comp_id
         * },
         * user,
         * session
         * )
         * 
         */

        // If we remove an 'arrived', all of the judge's ratings should be removed from that competition.
        // THIS IS A TODO. EZT IS ÁT KELL GONDOLNI
        //if (u.old.arrived?.length ?? 0 !== u.new.arrived?.length ?? 0) {
        //    // u.old beli azon elemek, amelyek nincsenek benne u.new ben
        //    // filter(not in u.new)
        //    const removed_competition_ids = (u.old.arrived ?? []).filter(competition_id => !(u.new.arrived ?? []).includes(competition_id) )
        //    update_dependent_promises.push(remove_rating(
        //        {
        //            product_id: 
        //            judge_id: u.old._id.toString()
        //        },
        //        user,
        //        session
        //    ))
        //}

        // If the approval_type is changed from 'payment' to anything else, then the entry_fee_payment should be removed.
        // THIS IS A TODO

    }

    const update_dependent_results = await Promise.all(update_dependent_promises) // or allsettled?
    const failed_operation = update_dependent_results.find(result => ![200, 201].includes(result.code))

    if (failed_operation) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return failed_operation // EXAMPLE: {code: 403, data: 'can_not_remove_a_rating_which_belongs_to_a_closed_competition'}
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