const entity_authorizer = async (actor, verb, data, session) => {

    let rules = {
        'competitor': {
            'find': {
                forbidden: ['ignore_extreme_values', 'certificate_template', 'rating_map', 'rating_sheets'],
                optional: '*'
            },
            '*': 'forbidden'
        },
        'judge': {
            'find': {
                forbidden: ['ignore_extreme_values', 'certificate_template', 'payment_needed', 'association_members_need_to_pay', 'entry_fee_amount', 'entry_fee_currency'],
                optional: '*'
            },
            '*': 'forbidden'
        },
        'organizer SERVER': {
            'create': {
                required: ['name', 'place'],
                forbidden: ['_id', 'creation_date', 'archived', 'archival_date', 'last_entry_open_date', 'last_entry_close_date', 'last_competition_open_date', 'last_competition_close_date'],
                optional: '*'
            },
            'update': {
                forbidden: ['_id', 'creation_date', 'archival_date', 'last_entry_open_date', 'last_entry_close_date', 'last_competition_open_date', 'last_competition_close_date'],
                optional: '*'
            },
            '*': 'optional'
        },
        'receiver': {
            'find': {
                forbidden: ['ignore_extreme_values', 'certificate_template', 'rating_map', 'rating_sheets'],
                optional: '*'
            },
            '*': 'forbidden'
        },
        '*': 'forbidden',
    }

    if (['judge', 'organizer', 'receiver'].includes(actor.role)) {
        const find_user_of_competition = (require('../../controllers/entities/find'))(`${actor.role}_of_competition`)
        const competitions_of_user = ((await find_user_of_competition(
            { projection: ['competition_id'] }, actor, session
        ))?.data ?? []).map(user_of_competition => user_of_competition.competition_id.toString())

        const _id_rule = {
            [`${actor.role}`]: {
                find: {
                    bound: { _id: { $in: competitions_of_user } },
                    optional: '*'
                }
            }
        }

        const insert_rule = require('../../helpers/insert_rule')
        rules = insert_rule(_id_rule, rules)
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer