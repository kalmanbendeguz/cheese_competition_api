// ONLY SERVER
module.exports = async (data, user, parent_session) => {

    // 1. Validate data
    const update_active_password_reset_validator = require('../../../validators/requests/api/active_password_reset/update')
    try {
        await update_active_password_reset_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/active_password_reset')
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
    const Active_Password_Reset_Model = require('../../../models/Active_Password_Reset')
    const session = parent_session ?? await Active_Password_Reset_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const active_password_resets = (await Active_Password_Reset_Model.find(
        filter,
        null,
        { session: session }
    )).map(active_password_reset => ({ old: structuredClone(active_password_reset), new: active_password_reset }))
    if (active_password_resets.length === 0) {
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
    for (const active_password_reset of active_password_resets) {
        const current_update = structuredClone(update)
        const current_remove = structuredClone(remove)

        active_password_reset.new.set(current_update)
        for (const key of current_remove) {
            active_password_reset.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const active_password_reset_validator = require('../../../validators/schemas/Active_Password_Reset')
    try {
        const validator_promises = active_password_resets.map((active_password_reset) =>
            active_password_reset_validator.validateAsync(active_password_reset.new)
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
    const dependencies = ['user']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/active_password_reset`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(active_password_resets, user, session))
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
    // Nothing needs to be checked, since nothing is updatable.

    // 10. Save updated documents
    await Active_Password_Reset_Model.bulkSave(active_password_resets.map(active_password_reset => active_password_reset.new), { session: session })

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