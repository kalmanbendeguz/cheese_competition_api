const check_cheese_exists = async function (req, res, next) {
    try {
        //console.log('check_cheese_exists')

        res.locals.unpaid_cheese =
            await req.app.models.unpaid_cheese.findOne({ 'product.public_id': req.body.public_id })
        
        if(res.locals.unpaid_cheese) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].no_cheese_with_this_id_exists)

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = check_cheese_exists