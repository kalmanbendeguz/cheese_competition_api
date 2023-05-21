const get_cheese_get = async function (req, res, next) {
    try {
        //console.log('get_cheese_get')

        res.locals.cheese = await req.app.models.cheese.findOne({ secret_id: res.locals.secret_id })

        if (res.locals.cheese) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].cheese_with_this_id_does_not_exist)
        
        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = get_cheese_get