const rating_picture_authorizer = (data, verb, user) => {

    const rules = {
        _id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        rating_id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        picture: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
    }

    const authorize_entity = require('../../helpers/authorize_entity')
    data = authorize_entity(data, verb, user, rules)
    return data
}

module.exports = rating_picture_authorizer