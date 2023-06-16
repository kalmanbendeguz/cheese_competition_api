module.exports = (req, res, next) => {

    const rules = require('../../../authorizers/api_endpoints')

    if (!(req.path in rules))
        return res.status(403).json(`no_authorization_rule_found_for_endpoint__${req.baseUrl}${req.path}__`)

    if (!(req.method in rules[req.path]))
        return res.status(403).json(`no__${req.method}__authorization_rule_found_for_endpoint__${req.baseUrl}${req.path}__`)

    const role = req.user?.role ?? 'UNAUTHENTICATED'
    if (!rules[req.path][req.method].includes(role))
        return res.status(403).json(`role__${role}__is_not_authorized_to__${req.method}__${req.baseUrl}${req.path}__`)

    return next()
}
