const update = async (data, user, parent_session) => {

    // 1. Validate data
    const update_allowed_role_validator = require('../../../validators/requests/api/allowed_role/update')
    try {
        await update_allowed_role_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize updatable
    const authorizer = require('../../../authorizers/entities/allowed_role')
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
    const Allowed_Role_Model = require('../../../models/Allowed_Role')
    const session = parent_session ?? await Allowed_Role_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const allowed_roles = (await Allowed_Role_Model.find(
        filter,
        null,
        { session: session }
    )).map(allowed_role => ({ old: allowed_role.$clone(), new: allowed_role }))
    if (allowed_roles.length === 0) {
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
    for (const allowed_role of allowed_roles) {
        const current_update = structuredClone(update)
        let current_remove = []

        // email cannot be updated

        // allowed_roles: if it is a string, then convert modifier string to an actual new allowed_roles array
        if ('allowed_roles' in current_update && typeof current_update.allowed_roles === 'string') {
            const allowed_role_modifiers = current_update.allowed_roles.split(' ')
            const allowed_roles_to_add = allowed_role_modifiers.filter(allowed_role_modifier => allowed_role_modifier[0] === '+').map(allowed_role_modifier => allowed_role_modifier.substring(1))
            const allowed_roles_to_remove = allowed_role_modifiers.filter(allowed_role_modifier => allowed_role_modifier[0] === '-').map(allowed_role_modifier => allowed_role_modifier.substring(1))
            current_update.allowed_roles = allowed_role.old.allowed_roles.filter(allowed_role => !allowed_roles_to_remove.includes(allowed_role)).concat(allowed_roles_to_add)
        }

        allowed_role.new.set(current_update)
        for (const key of current_remove) {
            allowed_role.new[key] = undefined
        }
    }

    // 7. Validate new documents
    const allowed_role_validator = require('../../../validators/schemas/Allowed_Role')
    try {
        const validator_promises = allowed_roles.map((allowed_role) =>
            allowed_role_validator.validateAsync(allowed_role.new)
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
    // Allowed_Role has no dependencies.

    // 9. Check collection integrity
    // Nothing needs to be checked.

    // 10. Save updated documents
    await Allowed_Role_Model.bulkSave(allowed_roles.map(allowed_role => allowed_role.new), { session: session })

    // 11. Update dependents
    // Only dependent: User
    const update_user = require('../user/update')

    const update_dependent_promises = []

    for (const allowed_role of allowed_roles) {
        // Don't add roles to existing users, because they might have to provide additional data to be able to have that role.
        // The user will add the role for himself.
        // But we still need to remove the removed roles.
        const removed_roles = allowed_role.old.allowed_roles.filter(a_r => !allowed_role.new.allowed_roles.includes(a_r))
        const removed_role_modifier_strings = removed_roles.map(removed_role => `-${removed_role}`)

        if (removed_role_modifier_strings.length === 0) continue

        const allowed_role_modifier_string = `${removed_role_modifier_strings.join(' ')}`

        update_dependent_promises.push(update_user(
            {
                query: {
                    email: allowed_role.new.email
                },
                body: {
                    roles: allowed_role_modifier_string
                }
            },
            user,
            session
        ))
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