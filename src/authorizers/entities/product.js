const entity_authorizer = async (actor, verb, data, session) => {

    const Joi = require('joi')

    let rules = {
        'competitor': {
            'create': {
                bound: { competitor_id: actor._id.toString() },
                required: ['competition_id', 'product_category_id', 'product_name', 'factory_name', 'product_description', 'maturation_time_type'],
                optional: ['maturation_time_quantity', 'maturation_time_unit'],
                forbidden: '*'
            },
            'find remove': {
                bound: { competitor_id: actor._id.toString() },
                forbidden: ['_id', 'secret_id', 'anonimized_product_name', 'anonimized_product_description'],
                optional: '*'
            },
            'update': {
                optional: ['product_category_id', 'product_name', 'factory_name', 'product_description', 'maturation_time_type', 'maturation_time_quantity', 'maturation_time_unit'],
                forbidden: '*'
            },
        },
        'judge': {
            'find': {
                bound: { approved: true, handed_in: true },
                pattern: { secret_id: Joi.string().allow('') },
                optional: ['competition_id', 'product_category_id', 'anonimized_product_name', 'anonimized_product_description', 'maturation_time_type', 'maturation_time_quantity', 'maturation_time_unit'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'organizer': {
            'find remove': 'optional',
            'update': {
                forbidden: ['_id', 'competition_id', 'competitor_id', 'public_id', 'secret_id'],
                optional: '*'
            },
            '*': 'forbidden'
        },
        'receiver': {
            'find': {
                forbidden: ['anonimized_product_name', 'anonimized_product_description'],
                optional: '*'
            },
            'update': {
                optional: ['handed_in'],
                forbidden: '*'
            },
            '*': 'forbidden'
        },
        'SERVER': {
            'create': {
                required: ['competition_id', 'competitor_id', 'product_category_id', 'product_name', 'factory_name', 'product_description', 'maturation_time_type'],
                forbidden: ['_id', 'public_id', 'secret_id'],
                optional: '*'
            },
            'find remove': 'optional',
            'update': {
                forbidden: ['_id', 'competition_id', 'competitor_id', 'public_id', 'secret_id'],
                optional: '*'
            },
        },
        '*': 'forbidden',
    }

    if (['judge', 'organizer', 'receiver'].includes(actor.role)) {
        const find_user_of_competition = (require('../../controllers/entities/find'))(`${actor.role}_of_competition`)
        const competitions_of_user = ((await find_user_of_competition(
            { projection: ['competition_id'] }, actor, session
        ))?.data ?? []).map(user_of_competition => user_of_competition.competition_id.toString())

        const competition_id_find_rule = {
            [`${actor.role}`]: {
                find: {
                    condition: { competition_id: { $in: competitions_of_user } },
                    optional: '*'
                }
            }
        }

        const insert_rule = require('../../helpers/insert_rule')
        rules = insert_rule(competition_id_find_rule, rules)

        if (actor.role === 'organizer' && verb === 'remove') {
            const competition_id_remove_rule = {
                organizer: {
                    remove: {
                        condition: { competition_id: { $in: competitions_of_user } },
                        optional: '*'
                    }
                }
            }

            rules = insert_rule(competition_id_remove_rule, rules)
        }
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer