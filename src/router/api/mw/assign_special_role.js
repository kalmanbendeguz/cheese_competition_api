const assign_special_role = (req, res, next) => {

    if (('user' in req) && !('role' in req.user)) req.user.role = 'ROLELESS'

    if (!('user' in req)) req.user = { role: 'UNAUTHENTICATED' }

    return next()
}

module.exports = assign_special_role