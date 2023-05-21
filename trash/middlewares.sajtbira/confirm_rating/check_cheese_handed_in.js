const check_cheese_handed_in = async function (req, res, next) {
    try {
        //console.log('check_cheese_handed_in')
        
        const hand_in = await req.app.models.hand_in.findOne({
            public_id: res.locals.cheese.public_id
        })

        if (hand_in) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].cheese_not_handed_in_yet)

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}


module.exports = check_cheese_handed_in