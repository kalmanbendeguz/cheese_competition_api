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