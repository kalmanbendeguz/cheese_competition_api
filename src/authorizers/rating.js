// JUDGE, ORGANIZER, SERVER
module.exports = (data, verb, user) => {

    const rules = {
        _id: {
            create: {},
            find: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
            project: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
            updatable: {
                judge: { rule: 'optional' },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        product_id: {
            create: {
                SERVER: 'required',
            },
            find: {
                organizer: 'optional',
                SERVER: 'optional',
            },
            project: {
                organizer: 'optional',
                SERVER: 'optional',
            },
            updatable: {
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        judge_id: {
            create: {
                SERVER: 'required',
            },
            find: {
                organizer: 'optional',
                SERVER: 'optional',
            },
            project: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
            updatable: {
                judge: { rule: 'bound', value: user._id.toString() },
                organizer: { rule: 'optional' },
                SERVER: { rule: 'optional' },
            },
            update: {},
            remove: {
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        anonymous: {
            create: {
                SERVER: 'optional',
            },
            find: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
            project: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
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
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        aspects: {
            create: {
                SERVER: 'required',
            },
            find: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
            project: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
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
                organizer: 'optional',
                SERVER: 'optional',
            },
        },
        overall_impression: {
            create: {
                SERVER: 'required',
            },
            find: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
            },
            project: {
                judge: 'optional',
                organizer: 'optional',
                SERVER: 'optional',
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
                organizer: 'optional',
                SERVER: 'optional',
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
            data[key] = rule.value
        } else if (policy === 'required' && !(key in data)) {
            throw `field_'${key}'_for_role_'${user.role}'_is_required_for_action_'${verb}'`
        } else if (policy === 'forbidden' && (key in data)) {
            throw `field_'${key}'_for_role_'${user.role}'_is_forbidden_for_action_'${verb}'`
        } else throw `unknown_rule_'${rule}'_for_field_'${key}'_for_action_'${verb}'_for_role_'${user.role}'`
    }

    return data
}