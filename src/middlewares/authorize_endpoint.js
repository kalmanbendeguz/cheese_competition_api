const authorize_endpoint = (req, res, next) => {

    const full_path = `${req.baseUrl}${req.path}`
    const full_path_array = full_path.split('/').slice(1)

    let current_path = ''
    let node = require(`../authorizers/endpoints`)
    console.log(full_path)

    for (const part of full_path_array) {
        current_path = `${current_path}/${part}`
        node = node[part]
        if (typeof node === 'undefined') {
            return res.status(403).json(`no_authorization_rule_found_for_endpoint_'${current_path}'`)
        }
        const method_rules_array = Object.entries(node).filter(([key, value]) => Array.isArray(value))
        const method_rules = {}
        for (const [key, value] of method_rules_array) {
            method_rules[key] = value
        }
        if (!(req.method in method_rules)) {
            return res.status(403).json(`no_'${req.method}'_authorization_rule_found_for_endpoint_'${current_path}'`)
        }

        if (!method_rules[req.method].includes(req.user.role)) {
            return res.status(403).json(`role_'${req.user.role}'_is_not_authorized_to_'${req.method}'_'${current_path}'`)
        }
    }

    return next()
}

module.exports = authorize_endpoint