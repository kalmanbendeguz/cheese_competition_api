const create = async (content, actor, session) => {

    // 1. Check dependencies
    // Dependencies : [Rating_Picture, Competition, Competition__User, Product, Rating, User]
    // Competition should exist.
    // Competition__User should exist and its roles should include 'judge', he should be arrived and should be table leader.
    // Competition__User's user_id should match the user_id and competition_id_should match the competition_id.
    

    // 1. Validate body
    const create_rating_picture_validator = require('../../../validators/requests/api/rating_picture/create')
    try {
        await create_rating_picture_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../../authorizers/entities/rating_picture')
    try {
        body = body.map((rating_picture) => authorizer(rating_picture, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Rating_Picture_Model = require('../../../../models/Rating_Picture')
    const session = parent_session ?? await Rating_Picture_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    const _rating_pictures = body.map((rating_picture) => ({
        rating_id: rating_picture.rating_id,
        picture: rating_picture.picture
    }))
    const rating_pictures = _rating_pictures.map((rating_picture) => new Rating_Picture_Model(rating_picture))

    // 6. Validate created documents
    const rating_picture_validator = require('../../../validators/schemas/Rating_Picture')
    try {
        const validator_promises = rating_pictures.map((rating_picture) =>
            rating_picture_validator.validateAsync(rating_picture)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 400, data: err.details }
    }

    // 7. Check dependencies: Ask all dependencies if this creation is possible.
    const dependencies = ['rating']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating_picture`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(rating_pictures.map(rating_picture => ({ old: null, new: rating_picture })), user, session))
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

    // 8. Check collection integrity
    // Nothing needs to be checked.

    // 9. Save created documents
    await Rating_Picture_Model.bulkSave(rating_pictures, { session: session })

    // 10. Update dependents
    // Rating_Picture has no dependents.

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined,
    }
}

module.exports = create