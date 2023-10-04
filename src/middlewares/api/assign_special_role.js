const assign_special_role = (req, res, next) => {

    if (!('user' in req)) req.user = { role: 'UNAUTHENTICATED' }

    if (('user' in req) && !('role' in req.user)) req.user.role = 'ROLELESS'

    return next()
}

module.exports = assign_special_role