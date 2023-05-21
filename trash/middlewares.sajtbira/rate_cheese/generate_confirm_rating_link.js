const generate_confirm_rating_link = function (req, res, next) {
    try {
        //console.log('generate_confirm_rating_link')
        const randomstring = require('randomstring')

        res.locals.confirm_id = randomstring.generate(32)

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = generate_confirm_rating_link