module.exports = (data, verb, user) => {
    // COMPETITOR, ORGANIZER, SERVER
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
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        competition_id: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                competitor: 'optional and everything is allowed',
                judge: 'optional and everything is allowed',
                organizer: 'optional and everything is allowed',
                receiver: 'optional and everything is allowed',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: 'optional and everything is allowed',
                judge: 'forbidden',
                organizer: 'optional and everything is allowed',
                receiver: 'forbidden',
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        competitor_id: {
            create: {
                SERVER: 'required',
                // competitor: forbidden
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'optional and everything is allowed',
                judge: 'optional and everything is allowed',
                organizer: 'optional and everything is allowed',
                receiver: 'optional and everything is zallowed',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: 'optional and everything is allowed',
                judge: 'forbidden',
                organizer: 'optional and everything is allowed',
                receiver: 'forbidden',
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                // authorize query for find and remove as well.
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        public_id: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        secret_id: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        product_name: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        anonimized_product_name: {
            create: {
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        factory_name: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        maturation_time_type: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        maturation_time_quantity: {
            create: {
                competitor: 'optional',
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        maturation_time_unit: {
            create: {
                competitor: 'optional',
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        milk_type: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        product_category_id: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        product_description: {
            create: {
                competitor: 'required',
                SERVER: 'required',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        anonimized_product_description: {
            create: {
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        approved: {
            create: {
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        approval_type: {
            create: {
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        handed_in: {
            create: {
                SERVER: 'optional',
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: 'forbidden',
                judge: 'forbidden',
                organizer: 'optional',
                receiver: 'optional',
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                // authorize query for find, and authorize body for update
                competitor: true,
                organizer: user._id === data.competitor_id,
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
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
