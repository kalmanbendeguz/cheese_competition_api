const remove = async (query, actor, session) => {

    const remove_active_password_reset = require('../remove')('active_password_reset')
    const remove_competitor_of_competition = require('../remove')('competitor_of_competition')
    const remove_judge_of_competition = require('../remove')('judge_of_competition')
    const remove_organizer_of_competition = require('../remove')('organizer_of_competition')
    const remove_product = require('../remove')('product')
    const remove_rating = require('../remove')('rating')
    const remove_rating_picture = require('../remove')('rating_picture')
    const remove_receiver_of_competition = require('../remove')('receiver_of_competition')

    // 1. Find
    const User_Model = require('../../../models/User')
    const users = await User_Model.find(query.filter, null, { session: session })

    for (const user of users) {
        // 2. Check dependencies
        // Dependencies: [Allowed_Role, Competition]
        // Nothing needs to be checked.

        // 3. Remove
        await user.deleteOne({ session: session })

        // 4. Update dependents
        // Dependents: [
        // Active_Password_Reset, Competitor_Of_Competition, Judge_Of_Competition,
        // Organizer_Of_Competition, Product, Rating, Rating_Picture, Receiver_Of_Competition
        // ]

        const update_dependent_promises = []

        // If we remove a User, we should remove all Active_Password_Resets associated with it.
        update_dependent_promises.push(
            remove_active_password_reset({ filter: { user_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Competitor_Of_Competitions associated with it.
        update_dependent_promises.push(
            remove_competitor_of_competition({ filter: { competitor_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Judge_Of_Competitions associated with it.
        update_dependent_promises.push(
            remove_judge_of_competition({ filter: { judge_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Organizer_Of_Competitions associated with it.
        update_dependent_promises.push(
            remove_organizer_of_competition({ filter: { organizer_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Products associated with it.
        update_dependent_promises.push(
            remove_product({ filter: { competitor_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Ratings associated with it.
        update_dependent_promises.push(
            remove_rating({ filter: { judge_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Rating_Pictures associated with it.
        update_dependent_promises.push(
            remove_rating_picture({ filter: { judge_id: user._id.toString() } }, actor, session)
        )

        // If we remove a User, we should remove all Receiver_Of_Competitions associated with it.
        update_dependent_promises.push(
            remove_receiver_of_competition({ filter: { receiver_id: user._id.toString() } }, actor, session)
        )

        const update_dependent_results = await Promise.all(update_dependent_promises)
        const failed_operation = update_dependent_results.find(result =>
            !(typeof result.code === 'number' && result.code >= 200 && result.code <= 299)
        )

        if (failed_operation) return failed_operation
    }

    // 5. Reply
    return {
        code: 204
    }
}

module.exports = remove