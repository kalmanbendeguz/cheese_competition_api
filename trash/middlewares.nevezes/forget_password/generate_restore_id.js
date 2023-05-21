const generate_restore_id = function (req, res, next) {
    try {
        //console.log('generate_restore_id')
        const randomstring = require('randomstring')

        res.locals.restore_id = randomstring.generate(32)

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = generate_restore_id