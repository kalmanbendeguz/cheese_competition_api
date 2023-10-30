const update = async (document, content, actor, session) => {

    // 1. Check dependencies
    // Dependencies: [Competition]
    // Nothing needs to be checked.

    // 2. Generate
    const update = content
    const remove = []

    // 3. Clone
    const old = document.$clone()

    // 4. Update locally
    document.set(update)

    for (const key of remove) {
        document[key] = undefined
    }

    // 4. Validate
    const validator = require('../../../../validators/schemas/models/Competition')
    try {
        await validator.validateAsync(document)
    } catch (error) {
        throw {
            type: 'schema_validation_error',
            error: error.details
        }
    }

    // 5. Save
    const updated = await document.save({ session: session })

    // 6. Update dependents
    // Dependents: [Competition__User, Entry_Fee_Payment, Product, Rating, Rating_Picture]
    // Competition__User doesn't need to be updated.
    // Entry_Fee_Payment doesn't need to be updated.

    // Product:
    // If we change product_category_tree, then all products non-conforming to the new tree, need to be removed.
    if (!is_subtree(
        old.category_configuration.product_category_tree,
        updated.category_configuration.product_category_tree)
    ) {
        const product = require('../../product')
        const products_of_competition = await product.access_find(
            { competition_id: updated._id.toString() },
            null, null, actor, session)
        const category_id_in_category_tree = require('../../../../helpers/category_id_in_category_tree')
        const products_to_remove = products_of_competition.filter(product => !(category_id_in_category_tree(product.product_category_id)))
        await product.access_remove(
            { _id: { $in: products_to_remove.map(product => product._id.toString()) } },
            actor,
            session
        )
    }


    // If we change approval_configuration, ...
    // --: not possible, -: leave intact
    // 0,0 -> pn:           -unapp-,  -payment-,  --assmember--,      bypass->unapp|assmember
    // 0,0 -> pn, amnp:     -unapp-,    -payment-,   assmember->unapp,  bypass->unapp
    // 1,0 -> 0,0:          unapp->bypass, -payment-,   -assmember-,    -bypass-
    // 1,0 -> pn, amnp:     -unapp-,    -payment-,  assmember->unapp,   bypass->unapp
    // 1,1 -> 0,0:          unapp->bypass, -payment-,   --assmember--,  -bypass-
    // 1,1 -> pn:           unapp->[assmember], -payment-,  --assmember--,  -bypass-








    // 7. Return
    return competition?.C



    // Check dependencies
    // Dependencies: [Allowed_Role]
    const user = require('../../active_password_reset')

    // Check dependencies
    // Dependencies: [Active_Password_Reset, User]
    // Cannot remove the last allowed organizer.

    const allowed_organizers = await user.alter_find(
        { filter: { _id: content.user_id.toString() } },
        actor,
        session
    )

    if (!user_of_active_password_reset) {
        throw {
            type: 'check_dependency_error',
            details: {
                resource: 'active_password_reset',
                method: 'create',
                user_id: content.user_id.toString(),
                error: 'provided_user_id_does_not_belong_to_an_existing_user'
            }
        }
    }
    // Nothing needs to be checked.

    // Remove document
    await document.deleteOne({ session: session })

    // Update dependents
    // Dependents: [Allowed_Role]

    // Return
    return






















    // 6. Check dependencies: Ask all dependencies if this remove is possible.
    // Allowed_Role has no dependencies.

    // 7. Check collection integrity
    // Nothing needs to be checked.

    // 8. Remove documents
    const ids_to_delete = allowed_roles.map((allowed_role) => allowed_role._id)
    await Allowed_Role_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    // Only dependent: User.
    // We need to remove the roles from the Users who had these allowed roles.
    const update_user = require('../user/update')
    const update_dependent_promises = []

    for (const allowed_role of allowed_roles) {
        // This check is only for safety, it is not necessary
        if (allowed_role.allowed_roles.length !== 0) {
            const modifier_string = `-${allowed_role.allowed_roles.join(' -')}`

            update_dependent_promises.push(update_user(
                {
                    query: {
                        email: allowed_role.email
                    },
                    body: {
                        roles: modifier_string
                    }
                },
                user,
                session
            ))
        }
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

    // 10. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 11. Reply
    return {
        code: 200,
        data: undefined,
    }
}

module.exports = update











const update = async (data, user, parent_session) => {

    // 1. Validate data
    const update_competition_validator = require('../../../validators/requests/api/competition/update')
    try {
        await update_competition_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/entitier/competition')
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
    const Competition_Model = require('../../../models/Competition')
    const session = parent_session ?? await Competition_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const competitions = (await Competition_Model.find(
        filter,
        null,
        { session: session }
    )).map(competition => ({ old: competition.$clone(), new: competition }))
    if (competitions.length === 0) {
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
    const now = Date.now
    for (const competition of competitions) {
        const current_update = structuredClone(update)
        let current_remove = []

        // ignore_extreme_values CAN be changed, OK
        // certificate_template CAN be changed, OK
        // product_category_tree CAN NOT be changed, OK
        // payment_needed CAN be changed, OK

        // entry_fee_currency
        if (
            'payment_needed' in current_update &&
            competition.old.payment_needed === true &&
            current_update.payment_needed === false
        ) {
            current_remove = current_remove.concat([
                'entry_fee_currency',
            ])
        }

        // entry_fee_amount
        if (
            'payment_needed' in current_update &&
            competition.old.payment_needed === true &&
            current_update.payment_needed === false
        ) {
            current_remove = current_remove.concat([
                'entry_fee_amount',
            ])
        }

        // association_members_need_to_pay
        if (
            'payment_needed' in current_update &&
            competition.old.payment_needed === true &&
            current_update.payment_needed === false
        ) {
            current_remove = current_remove.concat([
                'association_members_need_to_pay',
            ])
        }

        // archived CAN be changed, OK

        // archival_date
        if (
            'archived' in current_update &&
            competition.old.archived === false &&
            current_update.archived === true
        ) {
            current_update.archival_date = now
        }
        if (
            'archived' in current_update &&
            competition.old.archived === true &&
            current_update.archived === false
        ) {
            current_remove = current_remove.concat([
                'archival_date',
            ])
        }

        // competition_opened
        if (
            'archived' in current_update &&
            competition.old.archived === false &&
            current_update.archived === true
        ) {
            current_update.competition_opened = false
        }

        // last_competition_close_date
        if ('competition_opened' in current_update &&
            competition.old.competition_opened === true &&
            current_update.competition_opened === false
        ) {
            current_update.last_competition_close_date = now
        }

        // last_competition_open_date
        if (
            'competition_opened' in current_update &&
            competition.old.competition_opened === false &&
            current_update.competition_opened === true
        ) {
            current_update.last_competition_open_date = now
        }

        // entry_opened
        if (
            'archived' in current_update &&
            competition.old.archived === false &&
            current_update.archived === true
        ) {
            current_update.entry_opened = false
        }

        // last_entry_close_date
        if (
            'entry_opened' in current_update &&
            competition.old.entry_opened === true &&
            current_update.entry_opened === false
        ) {
            current_update.last_entry_close_date = now
        }

        // last_entry_open_date
        if (
            'entry_opened' in current_update &&
            competition.old.entry_opened === false &&
            current_update.entry_opened === true
        ) {
            current_update.last_entry_open_date = now
        }

        // creation_date CAN NOT be changed, OK
        // place CAN be changed, OK
        // name CAN be changed, OK

        competition.new.set(current_update)
        for (const key of current_remove) {
            competition.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const competition_validator = require('../../../validators/schemas/Competition')
    try {
        const validator_promises = competitions.map((competition) =>
            competition_validator.validateAsync(competition.new)
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
    // Competition has no dependencies.

    // 9. Check collection integrity
    // Nothing needs to be cheched.

    // 10. Save updated documents
    await Competition_Model.bulkSave(competitions.map(competition => competition.new), { session: session })

    // 11. Update dependents
    const update_dependent_promises = []
    // Dependents are: User, Product

    const find_product = require('../product/find')
    const find_user = require('../user/find')
    const update_product = require('../product/update')

    for (const competition of competitions) {
        // association_members_need_to_pay: false -> true:
        // All approved && approval_type=association_member products should be approved=false
        if (competition.old.association_members_need_to_pay === false && competition.new.association_members_need_to_pay === true) {
            update_dependent_promises.push(update_product(
                {
                    query: {
                        competition_id: competition.new._id.toString(),
                        approved: true,
                        approval_type: 'association_member'
                    },
                    body: {
                        approved: false
                    }
                },
                user,
                session
            ))
        }

        // association_members_need_to_pay: true -> false:
        // All unapproved && competitor.association_member products should be approved=true && approval_type=association_member
        if (competition.old.association_members_need_to_pay === true && competition.new.association_members_need_to_pay === false) {
            const unapproved_products_of_competition = (await find_product(
                {
                    competition_id: competition.new._id.toString(),
                    approved: false,
                },
                user,
                session
            ))?.data ?? []
            const owners_of_unapproved_products_who_are_association_members = (await find_user(
                {
                    _id: { $in: unapproved_products_of_competition.map(product => product.competitor_id.toString()) },
                    association_member: true
                },
                user,
                session
            ))?.data ?? []

            update_dependent_promises.push(update_product(
                {
                    query: {
                        _id: { $in: unapproved_products_of_competition.map(product => product._id.toString()) },
                        competitor_id: { $in: owners_of_unapproved_products_who_are_association_members.map(user => user._id.toString()) }
                    },
                    body: {
                        approved: true,
                        approval_type: 'association_member'
                    }
                },
                user,
                session
            ))
        }

        // payment_needed: false -> true:
        // All approved && approval_type=bypass products should be approved=false
        if (competition.old.payment_needed === false && competition.new.payment_needed === true) {
            update_dependent_promises.push(update_product(
                {
                    query: {
                        competition_id: competition.new._id.toString(),
                        approved: true,
                        approval_type: 'bypass'
                    },
                    body: {
                        approved: false
                    }
                },
                user,
                session
            ))
        }

        // payment_needed: true -> false:
        // All unapproved products should be approved=true && approval_type=bypass
        if (competition.old.payment_needed === true && competition.new.payment_needed === false) {
            update_dependent_promises.push(update_product(
                {
                    query: {
                        competition_id: competition.new._id.toString(),
                        approved: false,
                    },
                    body: {
                        approved: true,
                        approval_type: 'bypass'
                    }
                },
                user,
                session
            ))
        }
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