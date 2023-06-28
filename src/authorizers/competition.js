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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        name: {
            create: {
                SERVER: { rule: 'required' },
                organizer: { rule: 'required' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        place: {
            create: {
                SERVER: { rule: 'required' },
                organizer: { rule: 'required' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        creation_date: {
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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        entry_opened: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        last_entry_open_date: {
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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        last_entry_close_date: {
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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        competition_opened: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        last_competition_open_date: {
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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        last_competition_close_date: {
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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        archived: {
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        archival_date: {
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
                organizer: { rule: 'optional' },
            },
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        payment_needed: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        association_members_need_to_pay: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        entry_fee_amount: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        entry_fee_currency: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            },
        },
        product_category_tree: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
            updatable: {},
            update: {}, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {},
        },
        certificate_template: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
            updatable: {},
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {},
        },
        ignore_extreme_values: {
            create: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
                organizer: { rule: 'optional' },
            },
            update: {
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
            }, // user can use this field in PUT BODY
            // will be used in 'remove' controller function = find + remove. find implicitly authorizes for find. but we also need to authorize
            // for this: DELETE QUERY.
            remove: {
                // user can use this field in DELETE QUERY
                SERVER: { rule: 'optional' },
                organizer: { rule: 'optional' },
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
