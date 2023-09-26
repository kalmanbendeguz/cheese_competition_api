const update = async (data, actor, session) => {

    // 1. Find
    const Organizer_Of_Competition_Model = require('../../../models/Organizer_Of_Competition')
    const organizer_of_competition_validator = require('../../../validators/schemas/models/Organizer_Of_Competition')
    const organizer_of_competitions = await Organizer_Of_Competition_Model.find(data.query.filter, null, { session: session })

    const updated_organizer_of_competitions = []

    for (const organizer_of_competition of organizer_of_competitions) {
        // 2. Clone
        const old = organizer_of_competition.$clone()

        // 3. Check dependencies
        // Dependencies: [Organizer_Of_Competition, Competition, User]
        // Nothing needs to be checked.

        // 4. Update locally
        const update = data.body
        const remove = []

        organizer_of_competition.set(update)

        for (const key of remove) {
            organizer_of_competition[key] = undefined
        }

        // 5. Validate
        try {
            await organizer_of_competition_validator.validateAsync(organizer_of_competition)
        } catch (error) {
            return {
                code: 400,
                json: {
                    message: `update_model_validation_error`,
                    details: {
                        entity: 'organizer_of_competition',
                        data: organizer_of_competition,
                        error: error.details
                    }
                }
            }
        }

        // 6. Save
        const updated_organizer_of_competition = await organizer_of_competition.save({ session: session })
        updated_organizer_of_competitions.push(updated_organizer_of_competition)

        // 7. Update dependents
        // There are no dependents of Organizer_Of_Competition.
    }

    // 8. Reply
    return {
        code: updated_organizer_of_competitions.length !== 0 ? 200 : 204,
        data: updated_organizer_of_competitions,
    }
}

module.exports = update