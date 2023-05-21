const check_competition_opened = async function (req, res, next) {
    try {
        //console.log('check_competition_opened')

        const competition_opened = await req.app.models.key_value.findOne({ key: 'competition_opened' })

        if (!competition_opened) throw new Error(req.app.locals.dict[res.locals.lang].competition_opened_document_does_not_exist)
        if (competition_opened.value) return next()

        req.app.set_session_context(
            req.session,
            'errors',
            req.app.locals.dict[res.locals.lang].competition_is_not_opened_now
        )

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }

}

module.exports = check_competition_opened