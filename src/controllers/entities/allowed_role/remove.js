const remove = async (query, user, parent_session) => {

    // 1. Validate query
    const remove_allowed_role_validator = require('../../../validators/requests/api/allowed_role/remove')
    try {
        await remove_allowed_role_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize remove
    const authorizer = require('../../../authorizers/entities/allowed_role')
    try {
        query = authorizer(query, 'remove', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Start session and transaction if they don't exist
    const Allowed_Role_Model = require('../../../models/Allowed_Role')
    const session = parent_session ?? await Allowed_Role_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Find
    const filter = query
    const allowed_roles = await Allowed_Role_Model.find(filter, null, { session: session })
    if (allowed_roles.length === 0) {
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
    const allowed_role_validator = require('../../../validators/schemas/Allowed_Role')
    try {
        const validator_promises = allowed_roles.map(
            (allowed_role) =>
                allowed_role_validator.validateAsync(
                    allowed_role
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
    // Allowed_Role has no dependencies.

    // 7. Check collection integrity
    // Nothing needs to be checked.

    // 8. Remove documents
    const ids_to_delete = allowed_roles.map((allowed_role) => allowed_role._id)
    await Allowed_Role_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    // Only dependent: User.
    // We need to remove the roles from the Users who had these allowed roles.
    const update_user = require('../user/update')
    const update_dependent_promises = []

    for (const allowed_role of allowed_roles) {
        // This check is only for safety, it is not necessary
        if (allowed_role.allowed_roles.length !== 0) {
            const modifier_string = `-${allowed_role.allowed_roles.join(' -')}`

            update_dependent_promises.push(update_user(
                {
                    query: {
                        email: allowed_role.email
                    },
                    body: {
                        roles: modifier_string
                    }
                },
                user,
                session
            ))
        }
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