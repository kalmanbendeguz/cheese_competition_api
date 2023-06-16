// JUDGE, ORGANIZER, SERVER
module.exports = (data, verb, user) => {

    const rules = {
        _id: {
            create: {},
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        product_id: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        judge_id: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'bound', value: user._id.toString() },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        anonymous: {
            create: {
                SERVER: { rule: 'optional' },
            },
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        aspects: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
        },
        overall_impression: {
            create: {
                SERVER: { rule: 'required' },
            },
            find: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            project: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            remove: {
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
            throw `unknown_rule_'${rule}'_for_field_'${key}'_for_action_'${verb}'_for_role_'${user.role}'`
        }
    }

    return data
}