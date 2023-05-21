const check_cheese_belongs_to_user = function (req, res, next) {
    try {
        //console.log('check_view_cheese_belongs_to_user')

        if (res.locals.cheese.manufacturer.equals(req.user.id)) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].cheese_does_not_belong_to_user)

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_cheese_belongs_to_user