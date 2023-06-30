const authorize_entity = (data, verb, user, rules) => {

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

module.exports = authorize_entity