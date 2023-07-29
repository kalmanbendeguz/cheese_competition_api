const remove = async (query, user, parent_session) => {

    // 1. Validate query
    const remove_rating_validator = require('../../../validators/requests/api/rating/remove')
    try {
        await remove_rating_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize remove
    const authorizer = require('../../../authorizers/entities/rating')
    try {
        query = authorizer(query, 'remove', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Start session and transaction if they don't exist
    const Rating_Model = require('../../../models/Rating')
    const session = parent_session ?? await Rating_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Find
    const filter = query
    const ratings = await Rating_Model.find(filter, null, { session: session })
    if (ratings.length === 0) {
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
    const rating_validator = require('../../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map(
            (rating) =>
                rating_validator.validateAsync(
                    rating
                )
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
    const dependencies = ['product', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(ratings.map(rating => ({ old: rating, new: null })), user, session))
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

    // 7. Check collection integrity
    // Nothing needs to be checked.

    // 8. Remove documents
    const ids_to_delete = ratings.map((rating) => rating._id.toString())
    await Rating_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    const update_dependent_promises = []

    // Remove all Rating_Pictures that belong to this Rating.
    const remove_rating_picture = require('../rating_picture/remove')
    update_dependent_promises.push(
        remove_rating_picture(
            { rating_id: { $in: ids_to_delete } },
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