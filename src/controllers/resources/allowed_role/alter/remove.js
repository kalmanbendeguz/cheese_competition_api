const remove = async (document, actor, session) => {

    // Check dependencies
    // Dependencies: [Allowed_Role]
    const user = require('../../active_password_reset')

    // Check dependencies
    // Dependencies: [Active_Password_Reset, User]
    // Cannot remove the last allowed organizer.

    const allowed_organizers = await user.alter_find(
        { filter: { _id: content.user_id.toString() } },
        actor,
        session
    )

    if (!user_of_active_password_reset) {
        throw {
            type: 'check_dependency_error',
            details: {
                resource: 'active_password_reset',
                method: 'create',
                user_id: content.user_id.toString(),
                error: 'provided_user_id_does_not_belong_to_an_existing_user'
            }
        }
    }
    // Nothing needs to be checked.

    // Remove document
    await document.deleteOne({ session: session })

    // Update dependents
    // Dependents: [Allowed_Role]

    // Return
    return






















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