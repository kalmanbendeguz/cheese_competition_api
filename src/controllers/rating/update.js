// JUDGE, ORGANIZER, SERVER
module.exports = async (data, user, parent_session) => {
    
    // 1. Validate data
    const update_rating_validator = require('../../validators/requests/api/rating/update')
    try {
        await update_rating_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../authorizers/rating')
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
    const Rating_Model = require('../../models/Rating')
    const session = parent_session ?? await Rating_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const ratings = (await Rating_Model.find(
        filter,
        null,
        { session: session }
    )).map(rating => ({ old: structuredClone(rating), new: rating }))
    if (ratings.length === 0) {
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
    for (const rating of ratings) {
        const current_update = structuredClone(update)
        const current_remove = structuredClone(remove)

        rating.new.set(current_update)
        for (const key of current_remove) {
            rating.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const rating_validator = require('../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map((rating) =>
            rating_validator.validateAsync(rating.new)
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
    const dependencies = ['product', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(ratings, user, session))
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

    // 9. Check local constraints and collection integrity
    // Nothing needs to be checked.

    // 10. Save updated documents
    await Rating_Model.bulkSave(ratings.map(rating => rating.new), { session: session })

    // 11. Update dependents
    // Import dependent mutation controllers
    // create
    // No 'create' dependent controller needs to be imported
    // update
    // No 'update' dependent controller needs to be imported
    // remove
    // No 'remove' dependent controller needs to be imported
    // Nothing to do here.

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
