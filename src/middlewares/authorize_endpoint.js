const authorize_endpoint = (req, res, next) => {
    // ONLY AUTH AND UNAUTH CHECK!
    
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    const full_path = url.pathname
    const full_path_array = full_path.split('/').slice(1)

    let node = require(`../authorizers/endpoints`)
    let current_path = ''

    for (const part of full_path_array) {
        current_path = `${current_path}/${part}`
        if (!(part in node)) {
            console.log('====================AUTHORIZE ENDPOINT PROBLEM:====================')
            console.log(`no_authorization_rule_found_for_endpoint_'${current_path}'`)
            return res.status(403).json(`no_authorization_rule_found_for_endpoint_'${current_path}'`)
        }
        node = node[part]

        const method_rules = {}
        for (const key in node) {
            if (Array.isArray(node[key])) {
                method_rules[key] = node[key]
            }
        }

        if (!(req.method in method_rules)) {
            console.log('====================AUTHORIZE ENDPOINT PROBLEM:====================')
            console.log(`no_'${req.method}'_authorization_rule_found_for_endpoint_'${current_path}'`)
            return res.status(403).json(`no_'${req.method}'_authorization_rule_found_for_endpoint_'${current_path}'`)
        }

        const user_role = req.user?.role ?? 'UNAUTHENTICATED'

        if (!method_rules[req.method].includes(user_role)) {
            console.log('====================AUTHORIZE ENDPOINT PROBLEM:====================')
            console.log(`role_'${user_role}'_is_not_authorized_to_'${req.method}'_'${current_path}'`)
            return res.status(403).json(`role_'${user_role}'_is_not_authorized_to_'${req.method}'_'${current_path}'`)
        }
    }

    return next()
}

module.exports = authorize_endpoint