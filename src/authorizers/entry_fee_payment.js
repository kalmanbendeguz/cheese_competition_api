module.exports = (data, verb, user) => {
    const rules = {
        _id: {
            create: {}, // generated // POST BODY
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            updatable: {
                SERVER: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        product_ids: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                //user can use this field in GET QUERY
                //authorize query for find
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {},
            // authorize query for find, and authorize body for update
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        pending: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                //authorize query for find
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                // user can use this field in PUT BODY
                SERVER: { rule: 'optional' },
            },
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        barion_payment_id: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                SERVER: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        barion_transaction_id: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                SERVER: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        amount: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                SERVER: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        currency: {
            create: {},
            find: {
                // user can use this field in GET QUERY
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {
                SERVER: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        pos_transaction_id: {
            create: {}, // generated
            find: {
                // user can use this field in GET QUERY
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
            },
        },
        confirm_payment_id: {
            create: {}, // generated
            find: {
                // user can use this field in GET QUERY
                SERVER: { rule: 'optional' },
            },
            project: {
                SERVER: { rule: 'optional' },
            },
            updatable: {
                SERVER: { rule: 'optional' },
            },
            // will be used in 'update' controller function = find + update. find implicitly authorizes for find. so we need to authorize
            // only the PUT BODY
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
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
