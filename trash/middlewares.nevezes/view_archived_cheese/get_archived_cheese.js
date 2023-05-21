const get_archived_cheese = async function (req, res, next) {
    try {
        //console.log('get_archived_cheese')

        res.locals.cheese =
            await req.app.models.archived_cheese.findOne({ 'public_id': req.query.public_id }).lean()

        if (res.locals.cheese) return next()

        req.app.set_session_context(req.session, 'errors', req.app.locals.dict[res.locals.lang].no_archived_cheese_with_this_id_exists)

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }
}

module.exports = get_archived_cheese