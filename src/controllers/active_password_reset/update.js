// ONLY SERVER
module.exports = async (data, user) => {
    // 1. validate data
    const update_active_password_reset_validator = require('../../validators/requests/api/active_password_reset/update')
    try {
        await update_active_password_reset_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize updatable
    const authorizer = require('../../authorizers/active_password_reset')
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
    const Active_Password_Reset_Model = require('../../models/Active_Password_Reset')
    const active_password_resets = await Active_Password_Reset_Model.find(
        filter
        //projection, // is undefined okay? or should i convert to null
        //options // is undefined okay? or should i convert to null
    )
    if (active_password_resets.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_update',
        }

    // 5. check dependencies
    // if array.length is 0, 1, or more.
    if (active_password_resets.length === 0) {
        // check nothing; code wont even reach this ever
    }
    if (active_password_resets.length >= 1) {
        if (
            'restore_id' in data.body &&
            data.body.restore_id !== filter.restore_id &&
            (await Active_Password_Reset_Model.exists({
                restore_id: data.body.restore_id,
            }))
        )
            return {
                code: 409,
                data: 'can_not_change_restore_id_to_an_existing_restore_id',
            }
        const User_Model = require('../../models/User')
        if (
            'user_id' in data.body &&
            !(await User_Model.exists({
                _id: data.body.user_id,
                registration_temporary: false,
            }))
        )
            return {
                code: 403,
                data: 'provided_user_id_does_not_exist_or_user_not_activated',
            }
    }
    if (active_password_resets.length >= 2) {
        if ('restore_id' in filter)
            return {
                code: 409,
                data: 'multiple_active_password_resets_can_not_have_the_same_restore_id',
            }
    }

    // 6. prepare_update
    const update = data.body
    const remove = []

    // 7. update
    for (const active_password_reset of active_password_resets) {
        active_password_reset.set(update)

        for (const key of remove) {
            active_password_reset[key] = undefined
        }
    }

    // 8. validate documents
    const active_password_reset_validator = require('../../validators/schemas/Active_Password_Reset')
    try {
        const validator_promises = active_password_resets.map(
            (active_password_reset) =>
                active_password_reset_validator.validateAsync(
                    active_password_reset
                )
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 9. update dependencies
    // nothing to do here

    // 10. save
    const saver_promises = active_password_resets.map((active_password_reset) =>
        active_password_reset.save()
    )
    await Promise.all(saver_promises)

    // 11. reply
    return {
        code: 200,
        data: undefined,
    }
}
