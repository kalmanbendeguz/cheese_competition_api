const update = async (data, user, parent_session) => {

    // 1. Validate data
    const update_rating_picture_validator = require('../../../validators/requests/api/rating_picture/update')
    try {
        await update_rating_picture_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/entities/rating_picture')
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
    const Rating_Picture_Model = require('../../../models/Rating_Picture')
    const session = parent_session ?? await Rating_Picture_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const rating_pictures = (await Rating_Picture_Model.find(
        filter,
        null,
        { session: session }
    )).map(rating_picture => ({ old: rating_picture.$clone(), new: rating_picture }))
    if (rating_pictures.length === 0) {
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
    for (const rating_picture of rating_pictures) {
        const current_update = structuredClone(update)
        let current_remove = []

        rating_picture.new.set(current_update)
        for (const key of current_remove) {
            rating_picture.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const rating_picture_validator = require('../../../validators/schemas/Rating_Picture')
    try {
        const validator_promises = rating_pictures.map((rating_picture) =>
            rating_picture_validator.validateAsync(rating_picture.new)
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
    const dependencies = ['rating']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating_picture`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(rating_pictures, user, session))
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
    // Nothing needs to be checked.

    // 10. Save updated documents
    await Rating_Picture_Model.bulkSave(rating_pictures.map(rating_picture => rating_picture.new), { session: session })

    // 11. Update dependents
    // Rating_Picture has no dependents.

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