const create = async (body, user, parent_session) => {

    // 1. Validate body
    const create_rating_validator = require('../../../validators/requests/api/rating/create')
    try {
        await create_rating_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../../authorizers/entities/rating')
    try {
        body = body.map((rating) => authorizer(rating, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Rating_Model = require('../../../models/Rating')
    const session = parent_session ?? await Rating_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    const _ratings = body.map((rating) => ({
        product_id: rating.product_id,
        judge_id: rating.judge_id,
        anonymous: rating.anonymous,
        aspects: rating.aspects,
        overall_impression: rating.overall_impression,
    }))
    const ratings = _ratings.map((rating) => new Rating_Model(rating))

    // 6. Validate created documents
    const rating_validator = require('../../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map((rating) =>
            rating_validator.validateAsync(rating)
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
    const dependencies = ['product', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(ratings.map(rating => ({ old: null, new: rating })), user, session))
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
    // We need compound uniqueness of { product_id, judge_id }
    const new_product_ids_and_judge_ids = ratings.map(rating => `${rating.product_id.toString()}${rating.judge_id.toString()}`)
    const unique_new_product_ids_and_judge_ids = [...new Set(new_product_ids_and_judge_ids)]
    if (new_product_ids_and_judge_ids.length !== unique_new_product_ids_and_judge_ids.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        } return {
            code: 409,
            data: 'provided_product_ids_and_judge_ids_are_not_compound_unique',
        }
    }

    for (const rating of ratings) {
        if (
            await Rating_Model.exists({
                product_id: rating.product_id,
                judge_id: rating.judge_id,
            }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'product_id_and_judge_id_should_be_compound_unique',
            }
        }
    }

    // 9. Save created documents
    await Rating_Model.bulkSave(ratings, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated.

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