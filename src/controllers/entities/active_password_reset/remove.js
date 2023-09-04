const remove = async (query, actor, session) => {

    // 1. Find
    const Active_Password_Reset_Model = require('../../../models/Active_Password_Reset')
    const active_password_resets = await Active_Password_Reset_Model.find(query.filter, null, { session: session })

    for (const active_password_reset of active_password_resets) {
        // 2. Check dependencies
        // Dependencies: [User]
        // Nothing needs to be checked.

        // 3. Remove
        await active_password_reset.deleteOne({ session: session })

        // 4. Update dependents
        // There are no dependents of Active_Password_Reset.

    }

    // 5. Reply
    return {
        code: 204
    }
}

module.exports = remove