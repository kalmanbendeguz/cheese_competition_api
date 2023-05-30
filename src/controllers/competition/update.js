// ONLY SERVER
module.exports = async (data, user) => {
    // 1. validate data
    const update_competition_validator = require('../../validators/requests/api/competition/update')
    try {
        await update_competition_validator.validateAsync(data)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. authorize updatable
    const authorizer = require('../../authorizers/competition')
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
    const Competition_Model = require('../../models/Competition')
    const competitions = await Competition_Model.find(filter)
    if (competitions.length === 0)
        return {
            code: 404,
            data: 'no_documents_found_to_update',
        }

    // 5. check dependencies : will the database be consistent if i make this update?
    // nothing needs to be unique
    // the documents state will be checked at validation
    // so i dont think anything should be done here.

    // 6. prepare_update
    const update = data.body
    const remove = []

    // 7. update
    const now = Date.now
    for (const competition of competitions) {
        const current_update = structuredClone(update)
        let current_remove = structuredClone(remove)
        if (
            typeof current_update.archived !== 'undefined' &&
            !competition.archived &&
            current_update.archived
        ) {
            current_update.archival_date = now
            current_update.entry_opened = false
            current_update.competition_opened = false
        }
        if (typeof current_update.entry_opened !== 'undefined') {
            if (!competition.entry_opened && current_update.entry_opened)
                current_update.last_entry_open_date = now
            if (competition.entry_opened && !current_update.entry_opened)
                current_update.last_entry_close_date = now
        }
        if (typeof current_update.competition_opened !== 'undefined') {
            if (
                !competition.competition_opened &&
                current_update.competition_opened
            )
                current_update.last_competition_open_date = now
            if (
                competition.competition_opened &&
                !current_update.competition_opened
            )
                current_update.last_competition_close_date = now
        }
        if (
            typeof current_update.payment_needed !== 'undefined' &&
            competition.payment_needed &&
            !current_update.payment_needed
        ) {
            current_remove = current_remove.concat([
                'entry_fee_amount',
                'entry_fee_currency',
            ])
        }

        competition.set(current_update)

        for (const key of current_remove) {
            competition[key] = undefined
        }
    }

    // 8. validate documents
    const competition_validator = require('../../validators/schemas/Competition')
    try {
        const validator_promises = competitions.map((competition) =>
            competition_validator.validateAsync(competition)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        return { code: 500, data: err.details }
    }

    // 9. update dependents
    // no dependent needs to be updated.

    // 10. save
    const saver_promises = competitions.map((competition) => competition.save())
    await Promise.all(saver_promises)

    // 11. reply
    return {
        code: 200,
        data: undefined,
    }
}
