const entity_authorizer = (actor, verb, data) => {

    const rules = {
        'competitor': {
            'find': {
                forbidden: ['ignore_extreme_values', 'certificate_template', 'rating_map', 'rating_sheets', 'last_entry_open_date', 'last_entry_close_date', 'last_competition_open_date', 'last_competition_close_date'],
                optional: '*'
            },
            '*': 'forbidden'
        },
        'judge': {
            'find': {
                optional: ['_id', 'creation_date', 'name', 'place', 'product_category_tree', 'archived', 'rating_map', 'entry_opened', 'competition_opened', 'rating_sheets', 'archival_date'],
                forbidden: '*'
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

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(actor, verb, data, rules)
    return data
}

module.exports = entity_authorizer