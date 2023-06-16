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
        email: {
            create: {
                SERVER: { rule: 'required' },
            }, // generated // POST BODY
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
        username: {
            create: {
                SERVER: { rule: 'required' },
            }, // generated // POST BODY
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
        hashed_password: {
            create: {
                SERVER: { rule: 'required' },
            }, // generated // POST BODY
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
            remove: {},
        },
        roles: {
            create: {
                SERVER: { rule: 'required' },
            }, // generated // POST BODY
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
        full_name: {
            create: {
                SERVER: { rule: 'optional' },
            }, // generated // POST BODY
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
        contact_phone_number: {
            create: {
                SERVER: { rule: 'optional' },
            }, // generated // POST BODY
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
        billing_information: {
            create: {
                SERVER: { rule: 'optional' },
            }, // generated // POST BODY
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
        association_member: {
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
        registration_temporary: {
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
        confirm_registration_id: {
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
        table_leader: {
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
        arrived: {
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
            throw `unknown_rule_'${rule}'_for_field_'${key}'_for_action_'${verb}'_for_role_'${user.role}'`
        }
    }

    return data
}
