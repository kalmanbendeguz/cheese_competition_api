const get_cheese_post = async function (req, res, next) {
    try {
        //console.log('get_cheese_post')

        res.locals.cheese = await req.app.models.cheese.findOne({ secret_id: req.body.secret_id })

        if (res.locals.cheese) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].cheese_with_this_id_does_not_exist)
        
        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = get_cheese_post