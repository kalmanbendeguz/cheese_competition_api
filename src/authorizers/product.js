module.exports = (data, verb, user) => {
    // COMPETITOR, ORGANIZER, RECEIVER, SERVER
    const rules = {
        _id: {
            create: {}, // generated // POST BODY
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                //organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        competition_id: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        competitor_id: {
            create: {
                SERVER: { rule: 'required' },
                // competitor: forbidden
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                competitor: { rule: 'optional' },
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                // authorize query for find and remove as well.
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        public_id: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        secret_id: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_name: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        anonimized_product_name: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        factory_name: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        maturation_time_type: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        maturation_time_quantity: {
            create: {
                competitor: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        maturation_time_unit: {
            create: {
                competitor: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        milk_type: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_category_id: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_description: {
            create: {
                competitor: { rule: 'required' },
                SERVER: { rule: 'required' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        anonimized_product_description: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        approved: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        approval_type: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        handed_in: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
            },
            project: {},
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                organizer: { rule: 'optional' },
                receiver: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                competitor: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
    }

    for (const key in data) {
        if (!(key in rules)) throw `rule_is_not_implemented_for_field_'${key}'`
    }

    for (const key in rules) {
        const rule = rules[key][verb][user.role]
        const policy = rule?.rule ?? 'forbidden'

        if (policy === 'optional') {
        } else if (policy === 'bound') {
            if (key in data) {
                throw `field_'${key}'_for_role_'${user.role}'_is_bound_for_action_'${verb}'`
            }
            data[key] = rule.value
        } else if (policy === 'required' && !(key in data)) {
            throw `field_'${key}'_for_role_'${user.role}'_is_required_for_action_'${verb}'`
        } else if (policy === 'forbidden' && (key in data)) {
            throw `field_'${key}'_for_role_'${user.role}'_is_forbidden_for_action_'${verb}'`
        } else if (key in data) {
            throw `unknown_policy_'${policy}'_for_field_'${key}'_for_action_'${verb}'_for_role_'${user.role}'`
        }
    }

    return data
}
