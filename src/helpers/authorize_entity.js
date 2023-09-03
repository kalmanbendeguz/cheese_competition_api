// "project" should be a verb too !! but only in this method, not in the authorizers!!!

const authorize_entity = (actor, verb, data, rules) => {

    for (const key in data) {
        if (!(key in rules)) throw `rule_is_not_implemented_for_field_'${key}'`
    }

    for (const key in rules) {
        const rule = rules[key][verb][actor.role]
        const policy = rule?.rule ?? 'forbidden'

        if (policy === 'optional') {
        } else if (policy === 'bound') {
            if (key in data) {
                console.log('====================AUTHORIZE ENTITY PROBLEM:====================')
                console.log(`field_'${key}'_for_role_'${actor.role}'_is_bound_for_action_'${verb}'`)
                throw `field_'${key}'_for_role_'${actor.role}'_is_bound_for_action_'${verb}'`
            }
            data[key] = rule.value
        } else if (policy === 'required') {
            if (!(key in data)) {
                console.log('====================AUTHORIZE ENTITY PROBLEM:====================')
                console.log(`field_'${key}'_for_role_'${actor.role}'_is_required_for_action_'${verb}'`)
                throw `field_'${key}'_for_role_'${actor.role}'_is_required_for_action_'${verb}'`
            }
        } else if (policy === 'forbidden') {
            if (key in data) {
                console.log('====================AUTHORIZE ENTITY PROBLEM:====================')
                console.log(`field_'${key}'_for_role_'${actor.role}'_is_forbidden_for_action_'${verb}'`)
                throw `field_'${key}'_for_role_'${actor.role}'_is_forbidden_for_action_'${verb}'`
            }
        } else if (key in data) {
            console.log('====================AUTHORIZE ENTITY PROBLEM:====================')
            console.log(`unknown_policy_'${policy}'_for_field_'${key}'_for_action_'${verb}'_for_role_'${actor.role}'`)
            throw `unknown_policy_'${policy}'_for_field_'${key}'_for_action_'${verb}'_for_role_'${actor.role}'`
        }
    }

    return data
}

module.exports = authorize_entity