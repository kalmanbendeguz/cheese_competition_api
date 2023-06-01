// JUDGE, ORGANIZER, SERVER
module.exports = async (data, user, ignored_dependencies) => {

    // 1. Validate data: document integrity should be verified here.
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

    // 3. Authorize update
    try {
        data.body = authorizer(data.body, 'update', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Find
    const filter = data.query
    const Rating_Model = require('../../models/Rating')
    const ratings = (await Rating_Model.find(filter)).map(rating => ({ old: structuredClone(rating), new: rating }))
    if (ratings.length === 0) return {
        code: 404,
        data: 'no_documents_found_to_update',
    }

    // 5. Update locally
    const update = data.body
    const remove = []
    for (const rating of ratings) {
        const current_update = structuredClone(update)
        const current_remove = structuredClone(remove)

        rating.new.set(current_update)
        for (const key of current_remove) {
            rating.new[key] = undefined
        }
    }

    // 6. Validate new documents
    const rating_validator = require('../../validators/schemas/Rating')
    try {
        const validator_promises = ratings.map((rating) =>
            rating_validator.validateAsync(rating.new)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 7. Check collection integrity
    // Mostly uniqueness and compound uniqueness.
    // Nothing to do here now.

    // 8. Check dependencies: Ask all dependencies if this update is possible.
    const default_dependencies = ['product', 'user']
    const dependencies = default_dependencies.filter(dependency => !ignored_dependencies.includes(dependency))
    // Dependency approver imports
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        for (const rating of ratings) {
            dependency_approver_promises.push(dependency_approver(rating.old, rating.new, user))
        }
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) return {
        code: 403,
        data: unapproved.reason
    }

    // 9. Update dependents
    // Import dependent mutation controllers
    // create
    // No 'create' dependent controller needs to be imported
    // update
    // No 'update' dependent controller needs to be imported
    // remove
    // No 'remove' dependent controller needs to be imported
    // Nothing to do here.

    // 10. Save updated documents
    const new_ratings = ratings.map(rating => rating.new)
    await Rating_Model.bulkSave(new_ratings)

    // 11. Reply
    return {
        code: 200,
        data: undefined,
    }
}
