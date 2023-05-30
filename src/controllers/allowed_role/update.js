// ONLY SERVER
module.exports = async (data, user) => {
    const update_user = require('../user/update')

    // 1. validate data
    const update_allowed_role_validator = require('../../validators/requests/api/allowed_role/update')
    try {
        await update_allowed_role_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize updatable
    const authorizer = require('../../authorizers/allowed_role')
    const updatable_authorizer_result = authorizer(
        data.query,
        'updatable',
        user
    )
    if (!updatable_authorizer_result.authorized) {
        return { code: 403, data: updatable_authorizer_result.message }
    }

    // 3. authorize update
    const update_authorizer_result = authorizer(data.body, 'update', user)
    if (!update_authorizer_result.authorized) {
        return { code: 403, data: update_authorizer_result.message }
    }

    // 3. prepare find
    const filter = data.query

    // 4. find
    const Allowed_Role_Model = require('../../models/Allowed_Role')
    const allowed_roles = await Allowed_Role_Model.find(filter)
    if (allowed_roles.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_update',
        }

    // 5. check dependencies : will the database be consistent if i make this update?
    // an organizer cannot remove his organizer role
    if (
        user.role === 'organizer' &&
        ((!Array.isArray(data.body.allowed_roles) &&
            data.body.allowed_roles.split(' ').includes('-organizer')) ||
            (Array.isArray(data.body.allowed_roles) &&
                !data.body.includes('organizer')))
    )
        return {
            code: 403,
            data: 'an_organizer_can_not_remove_his_own_organizer_role',
        }

    // 6. prepare_update
    const all_roles = ['judge', 'organizer', 'receiver']
    let roles_to_add = []
    let roles_to_remove = []
    if (Array.isArray(data.body.allowed_roles)) {
        // it is an array
        roles_to_add = data.body.allowed_roles
        roles_to_remove = all_roles.filter(
            (role) => !roles_to_add.includes(role)
        )
    } else {
        // it is a string
        const role_actions = data.body.allowed_roles.split(' ')
        roles_to_add = role_actions.filter((action) => action[0] === '+')
        roles_to_remove = role_actions.filter((action) => action[0] === '-')
    }
    let update = {}
    const remove = []

    // 7. update
    for (const allowed_role of allowed_roles) {
        const current_allowed_roles_array = allowed_role.allowed_roles
        const modified_allowed_roles_array = [
            ...new Set(
                current_allowed_roles_array
                    .filter((ar) => !roles_to_remove.includes(ar))
                    .concat(roles_to_add)
            ),
        ]

        update = {
            allowed_roles: modified_allowed_roles_array,
        }

        allowed_role.set(update)

        for (const key of remove) {
            allowed_role[key] = undefined
        }
    }

    // 8. validate documents
    const allowed_role_validator = require('../../validators/schemas/Allowed_Role')
    try {
        const validator_promises = allowed_roles.map((allowed_role) =>
            allowed_role_validator.validateAsync(allowed_role)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 9. update dependents
    // if we added an allowed role, nothing needs to be done.
    // if we remove an allowed role, we should remove it from the user as well.
    const update_user_promises = allowed_roles.map((allowed_role) =>
        update_user(
            {
                query: { email: allowed_role.email },
                body: {
                    roles: roles_to_remove.map((ar) => `-${ar}`).join(' '),
                },
            },
            {
                role: 'SERVER',
            }
        )
    )
    await Promise.all(update_user_promises)

    // 10. save
    const saver_promises = allowed_roles.map((allowed_role) =>
        allowed_role.save()
    )
    await Promise.all(saver_promises)

    // 11. reply
    return {
        code: 200,
        data: undefined,
    }
}
