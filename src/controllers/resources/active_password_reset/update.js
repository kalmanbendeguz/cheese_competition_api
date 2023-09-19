const update = async (data, actor, session) => {

    // 1. Find
    const Active_Password_Reset_Model = require('../../../models/Active_Password_Reset')
    const active_password_reset_validator = require('../../../validators/schemas/models/Active_Password_Reset')
    const active_password_resets = await Active_Password_Reset_Model.find(data.query.filter, null, { session: session })

    const updated_active_password_resets = []

    for (const active_password_reset of active_password_resets) {
        // 2. Check dependencies
        // Dependencies: [Active_Password_Reset, User]
        // Nothing needs to be checked.

        // 3. Update locally
        const update = data.body
        const remove = []

        active_password_reset.set(update)

        for (const key of remove) {
            active_password_reset[key] = undefined
        }

        // 4. Validate
        try {
            await active_password_reset_validator.validateAsync(active_password_reset)
        } catch (error) {
            return {
                code: 400,
                json: {
                    message: `update_model_validation_error`,
                    details: {
                        entity: 'active_password_reset',
                        data: active_password_reset,
                        error: error.details
                    }
                }
            }
        }

        // 5. Save
        const updated_active_password_reset = await active_password_reset.save({ session: session })
        updated_active_password_resets.push(updated_active_password_reset)

        // 6. Update dependents
        // There are no dependents of Active_Password_Reset.
    }

    // 7. Reply
    return {
        code: updated_active_password_resets.length !== 0 ? 200 : 204,
        data: updated_active_password_resets,
    }
}

module.exports = update