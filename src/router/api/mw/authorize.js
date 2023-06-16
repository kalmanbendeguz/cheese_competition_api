module.exports = (req, res, next) => {

    const rules = require('../../../authorizers/api_endpoints')

    if (!(req.path in rules))
        return res.status(403).json(`no_authorization_rule_found_for_endpoint__${req.baseUrl}${req.path}__`)

    if (!(req.method in rules[req.path]))
        return res.status(403).json(`no__${req.method}__authorization_rule_found_for_endpoint__${req.baseUrl}${req.path}__`)

    req.user ??= { role: 'UNAUTHENTICATED' } // TODO CHANGE !!!! to UNAUTH NEEDBACK

    if (!rules[req.path][req.method].includes(req.user.role))
        return res.status(403).json(`role__${req.user.role}__is_not_authorized_to__${req.method}__${req.baseUrl}${req.path}__`)

    return next()
}
