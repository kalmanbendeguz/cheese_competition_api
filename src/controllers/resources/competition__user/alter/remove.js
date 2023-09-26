const remove = async (competition__user, actor, session) => {
    try {
        // 1. Check dependencies
        // Dependencies: [Competition__User, Competition, User]
        // Competition__User doesn't care.
        // Competition doesn't care.
        // User doesn't care.

        // 2. Remove
        const removed = await competition__user.deleteOne(null, { session: session })

        // 3. Update dependents
        // Dependents: [Competition__User, Rating, Rating_Picture]
        // Remove all Ratings associated with this Competition__User.
        const rating_controller = require('../../rating')
        const remove_rating_filter = { competition__user_id: competition__user._id.toString() }
        /*const akarmi1 =*/await rating_controller.access_remove(remove_rating_filter, actor, session)

        // Remove all Rating_Pictures associated with this Competition__User.
        const rating_picture_controller = require('../../rating_picture')
        const remove_rating_picture_filter = { competition__user_id: competition__user._id.toString() }
        /*const akarmi2 =*/ await rating_picture_controller.access_remove(remove_rating_picture_filter, actor, session)

        return // return removed?
    } catch (error) {
        throw {
            type: 'alter_remove_competition__user_error',
            document: competition__user
        }
    }
}

module.exports = remove