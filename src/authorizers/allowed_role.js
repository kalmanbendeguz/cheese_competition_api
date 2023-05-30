module.exports = (data, verb, user) => {
    const rules = {
        _id: {
            create: {}, // generated // POST BODY
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional',
            },
            project: {
                SERVER: 'optional',
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional',
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional',
            },
        },
        email: {
            create: {
                SERVER: 'required',
                organizer: 'required',
            }, // generated // POST BODY
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional',
            },
            project: {
                SERVER: 'optional',
            },
            updatable: {
                SERVER: 'optional',
                organizer: 'optional',
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {},
            // authorize query for find, and authorize body for update
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional',
            },
        },
        allowed_roles: {
            create: {
                SERVER: 'required',
                organizer: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional',
            },
            project: {
                SERVER: 'optional',
            },
            updatable: {
                SERVER: 'optional',
                organizer: 'optional',
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                SERVER: 'required',
                organizer: 'required',
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional',
            },
        },
    }

    for (let key in data) {
        if (!(key in rules))
            return {
                authorized: false,
                message: `rule_is_not_implemented_for_field__${key}__`,
            }
    }

    for (let key in rules) {
        if (rules[key][verb][user.role] === 'required') {
            if (key in data) continue
            else
                return {
                    authorized: false,
                    message: `field__${key}__for_role__${user.role}__is_required_for_action__${verb}__`,
                }
        } else if (rules[key][verb][user.role] === 'optional') continue
        else if (key in data)
            return {
                authorized: false,
                message: `field__${key}__for_role__${user.role}__is_forbidden_for_action__${verb}__`,
            }
    }

    return { authorized: true, message: null }
}
