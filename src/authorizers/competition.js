module.exports = (data, verb, user) => {
    const rules = {
        _id: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        name: {
            create: {
                SERVER: 'required',
                organizer: 'required'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        place: {
            create: {
                SERVER: 'required',
                organizer: 'required'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        creation_date: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        entry_opened: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        last_entry_open_date: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        last_entry_close_date: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        competition_opened: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        last_competition_open_date: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        last_competition_close_date: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        archived: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        archival_date: {
            create: {}, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        payment_needed: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        association_members_need_to_pay: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        entry_fee_amount: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        entry_fee_currency: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        product_category_tree: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        certificate_template: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
        ignore_extreme_values: {
            create: {
                SERVER: 'optional',
                organizer: 'optional'
            }, // generated // POST BODY
            find: { //user can use this field in GET QUERY
                //authorize query for find
                SERVER: 'optional'
            },
            project: {
                SERVER: 'optional'
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: 'optional',
                organizer: 'optional'
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: { // user can use this field in DELETE QUERY
                SERVER: 'optional',
                organizer: 'optional'
            },
        },
    }

    for (let key in data) {
        if (!(key in rules)) return { authorized: false, message: `rule_is_not_implemented_for_field__${key}__` }
    }

    for (let key in rules) {
        if (rules[key][verb][user.role] === 'required') {
            if (key in data) continue 
            else return { authorized: false, message: `field__${key}__for_role__${user.role}__is_required_for_action__${verb}__` }
        } else if (rules[key][verb][user.role] === 'optional') continue
        else if (key in data) return { authorized: false, message: `field__${key}__for_role__${user.role}__is_forbidden_for_action__${verb}__` }
    }

    return { authorized: true, message: null, }
}