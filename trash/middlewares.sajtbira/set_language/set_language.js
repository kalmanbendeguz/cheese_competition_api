const set_language = function (req, res, next) {
    try {
        //console.log('set_language')

        let language = req?.query?.language ?? req.app.locals.lang

        const allowed_languages = Object.keys(req.app.locals.dict)

        if (!allowed_languages.includes(language)) language = req.app.locals.lang

        res.cookie(
            'language',
            language,
            { maxAge: 34560000000 } // = 400 days // https://chromestatus.com/feature/4887741241229312
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = set_language
