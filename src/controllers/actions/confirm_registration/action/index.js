const confirm_registration = async (query, body, actor, session) => {

    // Check if the link is valid.
    const user = require('../../../resources/user')
    const user_of_confirm_registration_id = await user.access.find_one(
        {
            'registration.registration_temporary': true,
            'registration.confirm_registration_id': query.confirm_registration_id,
        },
        null,
        null,
        actor,
        session
    )

    if (!user_of_confirm_registration_id) {
        throw {}
    }

    // Activate User.
    // access.update gets: filter, content, actor, session
    const update_user_result = await user.access.update(
            {
                query: {
                    confirm_registration_id: req.query.confirm_registration_id,
                },
                body: {
                    registration_temporary: false
                }
            },
        actor,
        session
    )

    if (!(typeof update_user_result.code === 'number' && update_user_result.code >= 200 && update_user_result.code <= 299)) {
        if (session.inTransaction()) await session.abortTransaction()
        await session.endSession()
        return res.status(update_user_result.code).json(update_user_result.data)
    }

    // 5. Commit transaction and end session
    if (session.inTransaction()) await session.commitTransaction()
    await session.endSession()

    // 6. Reply
    return res.status(200).json(`confirm_registration_successful`)
}

module.exports = confirm_registration