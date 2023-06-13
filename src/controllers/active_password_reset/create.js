// ONLY SERVER
module.exports = async (body, user, parent_session) => {

    // 1. Validate body
    const create_active_password_reset_validator = require('../../validators/requests/api/active_password_reset/create')
    try {
        await create_active_password_reset_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../authorizers/active_password_reset')
    try {
        body = body.map((active_password_reset) => authorizer(active_password_reset, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Active_Password_Reset_Model = require('../../models/Active_Password_Reset')
    const session = parent_session ?? await Active_Password_Reset_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    const randomstring = require('randomstring')

    for (const active_password_reset of body) {
        let restore_id
        do {
            restore_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase',
            })
        } while (
            (await Active_Password_Reset_Model.exists({
                restore_id: restore_id,
            }, { session: session })) ||
            body.some(
                (active_password_reset) =>
                    active_password_reset.restore_id === restore_id
            ))

        active_password_reset.restore_id = restore_id
    }

    const _active_password_resets = body.map((active_password_reset) => ({
        user_id: active_password_reset.user_id,
        restore_id: active_password_reset.restore_id,
        // expiring_started is autogenerated
    }))

    const active_password_resets = _active_password_resets.map(
        (active_password_reset) =>
            new Active_Password_Reset_Model(active_password_reset)
    )

    // 6. Validate created documents
    const active_password_reset_validator = require('../../validators/schemas/Active_Password_Reset')
    try {
        const validator_promises = active_password_resets.map((active_password_reset) =>
            active_password_reset_validator.validateAsync(active_password_reset)
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
    const dependencies = ['user']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/active_password_reset`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(active_password_resets.map(active_password_reset => ({ old: null, new: active_password_reset })), user, session))
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
    // restore_ids should be unique
    const restore_ids = active_password_resets.map(active_password_reset => active_password_reset.restore_id.toString())
    if (await Active_Password_Reset_Model.exists({
        restore_id: { $in: restore_ids }
    }, { session: session })) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 409,
            data: 'generated_restore_ids_are_not_unique',
        }
    }

    // 9. Save created documents
    await Active_Password_Reset_Model.bulkSave(active_password_resets, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined, // TODO: check if it works if i leave it out, etc.
    }
}
