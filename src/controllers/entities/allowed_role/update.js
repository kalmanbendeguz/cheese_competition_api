const update = async (data, actor, session) => {

    // 1. Find
    const Allowed_Role_Model = require('../../../models/Allowed_Role')
    const allowed_role_validator = require('../../../validators/schemas/models/Allowed_Role')
    const update_user = require('../update')('user')

    const allowed_roles = await Allowed_Role_Model.find(data.query.filter, null, { session: session })

    const updated_allowed_roles = []

    for (const allowed_role of allowed_roles) {
        // 2. Clone
        const old = allowed_role.$clone()

        // 3. Check dependencies
        // Dependencies: [Allowed_Role]
        // It is forbidden to remove the last allowed organizer from the system.
        if (
            'allowed_roles' in data.body &&
            (!Array.isArray(data.body.allowed_roles) && data.body.allowed_roles.method === 'remove' && (data.body.allowed_roles.array.includes('organizer')))
            || (Array.isArray(data.body.allowed_roles) && !data.body.allowed_roles.array.includes('organizer'))
        ) {
            const number_of_allowed_organizers = await Allowed_Role_Model.countDocuments({ allowed_roles: { $in: ['organizer'] } }, { session: session })
            if (number_of_allowed_organizers === 1) {
                return {
                    code: 403,
                    json: {
                        message: `check_dependency_error`,
                        details: {
                            entity: 'allowed_role',
                            dependency: 'allowed_role',
                            error: 'forbidden_to_remove_the_last_allowed_organizer_from_the_database'
                        }
                    }
                }
            }
        }

        // 4. Update locally
        const update = data.body
        const remove = []

        // email cannot be updated
        // allowed_roles: if it is an object, then convert modifier object to an actual new allowed_roles array
        if ('allowed_roles' in update && !Array.isArray(update.allowed_roles)) {
            if (update.allowed_roles.method === 'add') {
                update.allowed_roles = [...new Set(allowed_role.allowed_roles.concat(update.allowed_roles.array))]
            } else if (update.allowed_roles.method === 'remove') {
                update.allowed_roles = allowed_role.allowed_roles.filter(allowed_role => !update.allowed_roles.array.includes(allowed_role))
            }
        }

        allowed_role.set(update)

        for (const key of remove) {
            allowed_role[key] = undefined
        }

        // 5. Validate
        try {
            await allowed_role_validator.validateAsync(allowed_role)
        } catch (error) {
            return {
                code: 400,
                json: {
                    message: `update_model_validation_error`,
                    details: {
                        entity: 'allowed_role',
                        data: allowed_role,
                        error: error.details
                    }
                }
            }
        }

        // 6. Save
        const updated_allowed_role = await allowed_role.save({ session: session })
        updated_allowed_roles.push(updated_allowed_role)

        // 7. Update dependents
        // Dependents: [User]
        const update_dependent_promises = []

        // If we remove an allowed_role, we should remove it from the associated User as well.
        const removed_roles = old.allowed_roles.filter(a_r => !updated_allowed_role.allowed_roles.includes(a_r))
        update_dependent_promises.push(
            update_user(
                {
                    query: { filter: { email: updated_allowed_role.email } },
                    body: { roles: { method: 'remove', array: removed_roles } }
                },
                actor, session
            ))

        const update_dependent_results = await Promise.all(update_dependent_promises)
        const failed_operation = update_dependent_results.find(result =>
            !(typeof result.code === 'number' && result.code >= 200 && result.code <= 299)
        )

        if (failed_operation) return failed_operation
    }

    // 8. Reply
    return {
        code: updated_allowed_roles.length !== 0 ? 200 : 204,
        data: updated_allowed_roles,
    }
}

module.exports = update