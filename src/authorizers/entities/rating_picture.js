const rating_picture_authorizer = (data, verb, user) => {

    const rules = {
        _id: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
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
        rating_id: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        picture: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            updatable: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
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

module.exports = rating_picture_authorizer