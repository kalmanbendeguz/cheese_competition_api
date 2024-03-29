const remove = async (query, user, parent_session) => {

    // 1. Validate query
    const remove_competition_validator = require('../../../validators/requests/api/competition/remove')
    try {
        await remove_competition_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize remove
    const authorizer = require('../../../authorizers/entities/competition')
    try {
        query = authorizer(query, 'remove', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Start session and transaction if they don't exist
    const Competition_Model = require('../../../models/Competition')
    const session = parent_session ?? await Competition_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Find
    const filter = query
    const competitions = await Competition_Model.find(filter, null, { session: session })
    if (competitions.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200,
            data: 'no_documents_found_to_remove',
        }
    }

    // 5. Validate documents
    const competition_validator = require('../../../validators/schemas/Competition')
    try {
        const validator_promises = competitions.map(
            (competition) => competition_validator.validateAsync(competition)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 6. Check dependencies: Ask all dependencies if this remove is possible.
    // Competition has no dependencies.

    // 7. Check collection integrity
    // Nothing needs to be checked.

    // 8. Remove documents
    const ids_to_delete = competitions.map((competition) => competition._id.toString())
    await Competition_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    // Dependents are: User, Product

    const update_dependent_promises = []

    // If we remove a competition, we should remove all products associated with it.
    const remove_product = require('../product/remove')
    update_dependent_promises.push(
        remove_product(
            { competition_id: { $in: ids_to_delete } },
            user,
            session
        )
    )

    // We should remove its _id from all associated users' table_leader and arrived array.
    const update_user = require('../user/update')
    update_dependent_promises.push(
        update_user(
            {
                query: {
                    table_leader: { $in: ids_to_delete }
                },
                body: {
                    table_leader: ids_to_delete.map(id => `-${id}`).join(' ')
                }
            },
            user,
            session
        )
    )
    update_dependent_promises.push(
        update_user(
            {
                query: {
                    arrived: { $in: ids_to_delete }
                },
                body: {
                    arrived: ids_to_delete.map(id => `-${id}`).join(' ')
                }
            },
            user,
            session
        )
    )

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

module.exports = remove