const set_save_general_settings_successful_context = function (req, res, next) {
    try {
        //console.log('set_save_general_settings_successful_context')
        req.app.set_session_context(
            req.session,
            'successes',
            req.app.locals.dict[res.locals.lang].saving_successful
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_save_general_settings_successful_context