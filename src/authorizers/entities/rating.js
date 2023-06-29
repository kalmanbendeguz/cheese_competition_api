const rating_authorizer = (data, verb, user) => {

    const rules = {
        _id: {
            create: {},
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_id: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        judge_id: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'bound', value: user._id.toString() },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        anonymous: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        aspects: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        overall_impression: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = rating_authorizer