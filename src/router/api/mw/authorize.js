module.exports = (req, res, next) => {

    const rules = {
        "/active_password_reset": {
            POST: ['SERVER'],
            GET: ['SERVER'],
            PUT: ['SERVER'],
            DELETE: ['SERVER'],
        },
        "/allowed_role": {
            POST: ['organizer', 'SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['organizer', 'SERVER'],
            DELETE: ['organizer', 'SERVER'],
        },
        "/competition": {
            POST: ['organizer', 'SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['organizer', 'SERVER'],
            DELETE: ['organizer', 'SERVER'],
        },
        "/entry_fee_payment": {
            POST: ['SERVER'],
            GET: ['organizer', 'SERVER'],
            PUT: ['SERVER'],
            DELETE: ['SERVER'],
        },
        "/product": {
            POST: ['competitor', 'SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['competitor', 'organizer', 'receiver', 'SERVER'],
            DELETE: ['competitor', 'organizer', 'SERVER'],
        },
        "/rating_picture": {
            POST: ['judge', 'SERVER'],
            GET: ['judge', 'organizer', 'SERVER'],
            PUT: ['judge', 'organizer', 'SERVER'],
            DELETE: ['judge', 'organizer', 'SERVER'],
        },
        "/rating": {
            POST: ['judge', 'SERVER'],
            GET: ['judge', 'organizer', 'SERVER'],
            PUT: ['judge', 'organizer', 'SERVER'],
            DELETE: ['judge', 'organizer', 'SERVER'],
        },
        "/user": {
            POST: ['SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            DELETE: ['SERVER'],
        },
    }

    if (!(req.path in rules)) return res.status(404).json(`no_authorization_rule_found_for_endpoint__${req.baseUrl}${req.path}__`)

    if (!(req.method in rules[req.path])) return res.status(403).json(`no__${req.method}__authorization_rule_found_for_endpoint__${req.baseUrl}${req.path}__`)

    if (!rules[req.path][req.method].includes(req.user.role)) return res.status(403).json(`role__${req.user.role}__is_not_authorized_to__${req.method}__${req.baseUrl}${req.path}__`)

    return next()
}