// ONLY SERVER
module.exports = async (body, user) => {
    // import models: subject resource and all queried resources
    const User_Model = require('../../models/User')
    const Allowed_Role_Model = require('../../models/Allowed_Role')
    //import controllers: all mutated resources outside subject resource

    // 1. validate body
    const create_user_validator = require('../../validators/requests/api/user/create')
    try { await create_user_validator.validateAsync(body) }
    catch (err) { return { code: 400, data: err.details } }

    // 2. arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. authorize {body, user}
    const authorizer = require('../../authorizers/user')
    const authorizer_results = body.map(u => authorizer(u, 'create', user))
    const violation = authorizer_results.find(result => !result.authorized)
    if (violation) { return { code: 403, data: violation.message } }

    // 4. check_dependencies
    // will the database be consistent if i create this document?
    for (const u of body) {
        //username should be unique
        if (await User_Model.exists({ 'username': u.username })) return {
            code: 409,
            data: 'username_already_exists'
        }
        //email should be unique
        if (await User_Model.exists({ 'email': u.email })) return {
            code: 409,
            data: 'email_already_exists'
        }
        //all wanted roles should be allowed
        const wanted_roles = u.roles.filter(role => role !== 'competitor')
        if (await Allowed_Role_Model.exists({
            email: u.email,
            allowed_roles: { $all: wanted_roles },
        })) return {
            code: 403,
            data: 'at_least_one_of_the_wanted_roles_is_not_allowed_for_this_email'
        }
    }

    // 5. prepare: produce the documents that will be saved.
    const randomstring = require('randomstring')
    for (const u of body) {
        // email: ok
        // username: ok
        // hashed_password: ok
        // roles: ok
        // full_name: ok
        // contact_phone_number: ok
        // billing_information: ok
        if (u.roles.includes('competitor')) { u.association_member = false }
        u.registration_temporary = true

        let existing_temporary_user
        let confirm_registration_id
        do {
            confirm_registration_id = randomstring.generate({
                length: 32,
                charset: 'alphanumeric',
                capitalization: 'lowercase'
            })

            existing_temporary_user = await User_Model.exists({ 'confirm_registration_id': confirm_registration_id })
                || body.some(u => u.confirm_registration_id === confirm_registration_id)

        } while (existing_temporary_user)
        u.confirm_registration_id = confirm_registration_id

        if (u.roles.includes('judge')) { u.table_leader = [] }
        if (u.roles.includes('judge')) { u.arrived = [] }
    }

    const _users = body

    // 6. create
    const users = _users.map(u => new User_Model(u))

    // 7. validate_documents
    const user_validator = require('../../validators/schemas/User')
    try {
        const validator_promises = users.map(u => user_validator.validateAsync(u))
        await Promise.all(validator_promises)
    } catch (err) { return { code: 400, data: err.details } }

    // 8. update_dependents
    // nothing needs to be updated :)

    // 9. save
    const saver_promises = users.map(u => u.save())
    await Promise.all(saver_promises)

    // 10. reply
    return {
        code: 201,
        data: undefined // TODO, check if it works if i leave it out, etc.
    }
}