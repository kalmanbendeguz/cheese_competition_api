// ONLY SERVER
module.exports = async (query, user) => {
    // 1. validate query
    const find_active_password_reset_validator = require('../../validators/requests/api/active_password_reset/find')
    try {
        await find_active_password_reset_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize {query.filter, user}
    const authorizer = require('../../authorizers/active_password_reset')
    const filter_authorizer_result = authorizer(query.filter ?? {}, 'find', user)
    if (!filter_authorizer_result.authorized) {
        return { code: 403, data: filter_authorizer_result.message }
    }

    // 3. authorize {query.projection, user}
    const projection_authorizer_result = authorizer(
        query.projection,
        'project',
        user
    )
    if (!projection_authorizer_result.authorized) {
        return { code: 403, data: projection_authorizer_result.message }
    }

    // 3. prepare
    const filter = query.filter
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    // 4. find
    const Active_Password_Reset_Model = require('../../models/Active_Password_Reset')

    const active_password_resets = await Active_Password_Reset_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        options // is undefined okay? or should i convert to null
    )

    // 5. validate documents
    //const active_password_reset_validator = require('../../validators/schemas/Active_Password_Reset')
    //try {
    //    const validator_promises = active_password_resets.map(
    //        (active_password_reset) =>
    //            active_password_reset_validator.validateAsync(
    //                active_password_reset
    //            )
    //    )
    //    await Promise.all(validator_promises)
    //} catch (err) {
    //    return { code: 500, data: err.details }
    //}

    // 6. send
    return {
        code: 200,
        data: active_password_resets,
    }
}
