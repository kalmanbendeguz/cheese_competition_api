// SERVER, ORGANIZER
module.exports = async (body, user) => {
    const Allowed_Role_Model = require('../../models/Allowed_Role')

    // 1. validate body
    const create_allowed_role_validator = require('../../validators/requests/api/allowed_role/create')
    try {
        await create_allowed_role_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. authorize {body, user}
    const authorizer = require('../../authorizers/allowed_role')
    const authorizer_results = body.map((allowed_role) =>
        authorizer(allowed_role, 'create', user)
    )
    const violation = authorizer_results.find((result) => !result.authorized)
    if (violation) {
        return { code: 403, data: violation.message }
    }

    // 4. check_dependencies : will the database be consistent if i create this document?
    for (const allowed_role of body) {
        //email should be unique
        if (await Allowed_Role_Model.exists({ email: allowed_role.email }))
            return {
                code: 409,
                data: 'allowed_role_with_email_already_exists',
            }
    }

    // 5. prepare
    const _allowed_roles = body

    // 6. create
    const allowed_roles = _allowed_roles.map(
        (allowed_role) => new Allowed_Role_Model(allowed_role)
    )

    // 7. validate_documents
    const allowed_role_validator = require('../../validators/schemas/Allowed_Role')
    try {
        const validator_promises = allowed_roles.map((allowed_role) =>
            allowed_role_validator.validateAsync(allowed_role)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 8. update_dependents
    // dont add roles to existing users! bc they might have to provide additional data to be able to have a role.
    // so if a [competitor] exists and we add the judge role: there may be judge specific fields on User.
    // (btw at this time there are none...)
    // the user will add the role for himself.
    // or if possible, give them the role? well, dont. because at registration, he wont get the allowed roles, bc.
    // he registers for a single role on the ui. so  if we dont give it to him on registration, then we should neither give it to them here.
    // he will have to ask for it.

    // 9. save
    const saver_promises = allowed_roles.map((allowed_role) =>
        allowed_role.save()
    )
    await Promise.all(saver_promises)

    // 10. reply
    return {
        code: 201,
        data: undefined, // TODO, check if it works if i leave it out, etc.
    }
}
