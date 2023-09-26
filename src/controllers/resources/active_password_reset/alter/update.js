const update = async (active_password_reset, content, actor, session) => {

    // 1. Check dependencies
    // Dependencies: [Active_Password_Reset, User, (Sent Email)]
    // Because of the sent email, nothing can be changed.
    // (user_id, restore_id and expiring_started are all bound to the sent email)

    // 2. Update locally
    // Because nothing can be changed, no update is performed.

    // 3. Update dependents
    // Active_Password_Reset has no dependents.

    // 4. Return
    return active_password_reset
}

module.exports = update