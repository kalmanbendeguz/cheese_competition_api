const update = async (data, actor, session) => {

    // 1. Find
    const Competitor_Of_Competition_Model = require('../../../models/Competitor_Of_Competition')
    const competitor_of_competition_validator = require('../../../validators/schemas/models/Competitor_Of_Competition')
    const competitor_of_competitions = await Competitor_Of_Competition_Model.find(data.query.filter, null, { session: session })

    const updated_competitor_of_competitions = []

    for (const competitor_of_competition of competitor_of_competitions) {
        // 2. Clone
        const old = competitor_of_competition.$clone()

        // 3. Check dependencies
        // Dependencies: [Competitor_Of_Competition, Competition, User]
        // Nothing needs to be checked.

        // 4. Update locally
        const update = data.body
        const remove = []

        competitor_of_competition.set(update)

        for (const key of remove) {
            competitor_of_competition[key] = undefined
        }

        // 5. Validate
        try {
            await competitor_of_competition_validator.validateAsync(competitor_of_competition)
        } catch (error) {
            return {
                code: 400,
                json: {
                    message: `update_model_validation_error`,
                    details: {
                        entity: 'competitor_of_competition',
                        data: competitor_of_competition,
                        error: error.details
                    }
                }
            }
        }

        // 6. Save
        const updated_competitor_of_competition = await competitor_of_competition.save({ session: session })
        updated_competitor_of_competitions.push(updated_competitor_of_competition)

        // 7. Update dependents
        // There are no dependents of Competitor_Of_Competition.
    }

    // 8. Reply
    return {
        code: updated_competitor_of_competitions.length !== 0 ? 200 : 204,
        data: updated_competitor_of_competitions,
    }
}

module.exports = update