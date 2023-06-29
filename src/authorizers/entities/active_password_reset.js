const active_password_reset_authorizer = (data, verb, user) => {
    const rules = {
        _id: {
            create: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        user_id: {
            create: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'required' },
            },
            find: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        restore_id: {
            create: {
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                ROLELESS: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
            },
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
        expiring_started: {
            create: {},
            find: {
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                SERVER: { rule: 'optional' },
            },
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = active_password_reset_authorizer