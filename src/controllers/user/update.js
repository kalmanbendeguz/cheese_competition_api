// COMPETITOR, JUDGE, ORGANIZER, RECEIVER, SERVER
module.exports = async (data, user, parent_session) => {

    // 1. Validate data
    const update_user_validator = require('../../validators/requests/api/user/update')
    try {
        await update_user_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../authorizers/user')
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
    const User_Model = require('../../models/User')
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
        if ('roles' in current_update) {
            let new_roles = []
            if (Array.isArray(current_update.roles)) {
                new_roles = current_update.roles
            } else if (typeof current_update.roles === 'string') {
                const role_modifiers = current_update.roles.split(' ')
                const roles_to_add = role_modifiers.filter(role_modifier => role_modifier[0] === '+').map(role_modifier => role_modifier.substring(1))
                const roles_to_remove = role_modifiers.filter(role_modifier => role_modifier[0] === '-').map(role_modifier => role_modifier.substring(1))
                new_roles = u.old.roles.filter(role => !roles_to_remove.includes(role)).concat(roles_to_add)
            } else {
                // ERROR: this should not happen.
            }

            if (!new_roles.some(new_role => ['competitor', 'judge'].includes(new_role))) {
                current_remove = current_remove.concat(['full_name'])
            }
            if (!new_roles.some(new_role => ['competitor'].includes(new_role))) {
                current_remove = current_remove.concat(['contact_phone_number', 'billing_information', 'association_member'])
            }
            if (!new_roles.some(new_role => ['judge'].includes(new_role))) {
                current_remove = current_remove.concat(['table_leader', 'arrived'])
            }

            current_update.roles = new_roles
        }

        // full_name is OK
        // contact_phone_number is OK
        // billing_information is OK? (there are optional fields in it that can be removed!!!)
        // association_member is OK

        // registration_temporary:
        if ('registration_temporary' in current_update) { // it can only be false
            if (u.old.registration_temporary && !current_update.registration_temporary) {
                current_remove = current_remove.concat(['confirm_registration_id'])
            }
        }

        if ('table_leader' in current_update) {
            let new_competition_ids = []
            if (Array.isArray(current_update.table_leader)) {
                new_competition_ids = current_update.table_leader
            } else if (typeof current_update.table_leader === 'string') {
                const table_leader_modifiers = current_update.table_leader.split(' ')
                const competition_ids_to_add = table_leader_modifiers.filter(table_leader_modifier => table_leader_modifier[0] === '+').map(table_leader_modifier => table_leader_modifier.substring(1))
                const competition_ids_to_remove = table_leader_modifiers.filter(table_leader_modifier => table_leader_modifier[0] === '-').map(table_leader_modifier => table_leader_modifier.substring(1))
                new_competition_ids = u.old.table_leader.filter(competition_id => !competition_ids_to_remove.includes(competition_id)).concat(competition_ids_to_add)
            } else {
                // ERROR: this should not happen.
            }

            current_update.table_leader = new_competition_ids
        }

        if ('arrived' in current_update) {
            let new_competition_ids = []
            if (Array.isArray(current_update.arrived)) {
                new_competition_ids = current_update.arrived
            } else if (typeof current_update.arrived === 'string') {
                const arrived_modifiers = current_update.arrived.split(' ')
                const competition_ids_to_add = arrived_modifiers.filter(arrived_modifier => arrived_modifier[0] === '+').map(arrived_modifier => arrived_modifier.substring(1))
                const competition_ids_to_remove = arrived_modifiers.filter(arrived_modifier => arrived_modifier[0] === '-').map(arrived_modifier => arrived_modifier.substring(1))
                new_competition_ids = u.old.arrived.filter(competition_id => !competition_ids_to_remove.includes(competition_id)).concat(competition_ids_to_add)
            } else {
                // ERROR: this should not happen.
            }

            current_update.arrived = new_competition_ids
        }


        // 6. prepare_update
        /* const all_roles = ['judge', 'organizer', 'receiver']
         let roles_to_add = []
         let roles_to_remove = []
         if (Array.isArray(data.body.allowed_roles)) {
             // it is an array
             roles_to_add = data.body.allowed_roles
             roles_to_remove = all_roles.filter(
                 (role) => !roles_to_add.includes(role)
             )
         } else {
             // it is a string
             const role_actions = data.body.allowed_roles.split(' ')
             roles_to_add = role_actions.filter((action) => action[0] === '+')
             roles_to_remove = role_actions.filter((action) => action[0] === '-')
         }
         let update = {}
         const remove = []*/
        // current_update.roles: array || string || undefined

        // competition_id, competitor_id, public_id and secret_id cannot be changed
        // product_name, anonimized_product_name, factory_name is OK
        if (
            'maturation_time_type' in current_update &&
            product.old.maturation_time_type === 'matured' &&
            current_update.maturation_time_type === 'fresh'
        ) {
            current_remove = current_remove.concat([
                'maturation_time_quantity',
                'maturation_time_unit',
            ])
        }
        // milk_type, product_category_id, product_description, anonimized_product_description is OK
        if (
            'approved' in current_update &&
            product.old.approved &&
            !current_update.approved
        ) {
            current_remove = current_remove.concat([
                'approval_type',
            ])
        }
        // handed_in is OK

        product.new.set(current_update)
        for (const key of current_remove) {
            product.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const product_validator = require('../../validators/schemas/Product')
    try {
        const validator_promises = products.map((product) =>
            product_validator.validateAsync(product.new)
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
    const dependencies = ['user', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(products, user, session))
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
    // public_id and secret_id should be unique, but it is checked at creation.
    // milk_type should be valid, but it is for a later concern (at validation OR at approve dep mut.)
    // product_category_id should be valid, but it is asked at competition/approve_dependent_mutation/product
    // an unapproved product cannot be handed in: this should be checked at document validation

    // 10. Save updated documents
    await Product_Model.bulkSave(products.map(product => product.new), { session: session })

    // 11. Update dependents
    // Dependents are: Rating, Entry_Fee_Payment
    // A rating should not be updated.
    // If the approval_type is changed from 'payment' to anything else, then the entry_fee_payment should be removed.
    // Import dependent mutation controllers
    // create
    // No 'create' dependent controller needs to be imported
    // find
    // No 'find' dependent controller needs to be imported
    // update
    // No 'update' dependent controller needs to be imported
    // remove
    const remove_entry_fee_payment = require('../entry_fee_payment/remove')

    const update_dependent_promises = []

    for (const product of products) {
        if (product.old.approval_type === 'payment' && product.new.approval_type !== 'payment') {
            update_dependent_promises.push(remove_entry_fee_payment( // he will be unauthorized, but thats ok.
                {
                    product_ids: { $in: [product.old._id.toString()] },
                },
                user,
                session
            ))
        }
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