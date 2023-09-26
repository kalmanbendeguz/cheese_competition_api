const entity_authorizer = async (actor, verb, data, session) => {

    let rules = {

        'judge': {
            'create': {
                bound: { judge_id: actor._id.toString() },
                required: ['competition_id', 'product_id', 'aspects', 'overall_impression'],
                optional: ['anonymous'],
                forbidden: '*',
            },
            'update': {
                optional: ['anonymous', 'aspects', 'overall_impression'],
                forbidden: '*'
            },
            'find remove': {
                bound: { judge_id: actor._id.toString() },
                optional: '*'
            },
        },
        'organizer': {
            'update': {
                optional: ['anonymous', 'aspects', 'overall_impression'],
                forbidden: '*'
            },
            'find remove': 'optional',
            '*': 'forbidden'
        },
        'SERVER': {
            'create': {
                required: ['competition_id', 'product_id', 'judge_id', 'aspects', 'overall_impression'],
                optional: ['anonymous'],
                forbidden: '*',
            },
            'update': {
                optional: ['anonymous', 'aspects', 'overall_impression'],
                forbidden: '*'
            },
            '*': 'optional'
        },
        '*': 'forbidden'
    }

    if (actor.role === 'judge') {
        const find_user_of_competition = (require('../../controllers/entities/find'))(`user_of_competition`)
        const competitions_of_judge = ((await find_user_of_competition(
            { projection: ['competition_id'] }, actor, session
        ))?.data ?? []).map(judge_of_competition => judge_of_competition.competition_id.toString())

        const competition_id_create_rule = {
            judge: {
                create: {
                    condition: { competition_id: { $in: competitions_of_judge } },
                    optional: '*'
                }
            }
        }

        rules = insert_rule(competition_id_create_rule, rules)
    }

    if (actor.role === 'organizer') {
        const find_user_of_competition = (require('../../controllers/entities/find'))(`user_of_competition`)
        const competitions_of_organizer = ((await find_user_of_competition(
            { projection: ['competition_id'] }, actor, session
        ))?.data ?? []).map(organizer_of_competition => organizer_of_competition.competition_id.toString())

        const competition_id_find_remove_rule = {
            organizer: {
                'find remove': {
                    condition: { competition_id: { $in: competitions_of_organizer } },
                    optional: '*'
                }
            }
        }

        rules = insert_rule(competition_id_find_remove_rule, rules)
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer