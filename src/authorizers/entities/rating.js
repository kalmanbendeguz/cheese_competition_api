const rating_authorizer = (data, verb, user) => {

    const rules = {
        _id: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        product_id: {
            create: {}, // required for server
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        judge_id: {
            create: {}, // required for server
            find: {},
            project: {},
            updatable: {}, // bound for judge
            update: {},
            remove: {},
        },
        anonymous: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        aspects: {
            create: {},
            find: {},
            project: {},
            updatable: {},
            update: {},
            remove: {},
        },
        overall_impression: {
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

module.exports = rating_authorizer