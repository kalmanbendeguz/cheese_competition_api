const hash_set_password = async function (req, res, next) {
    try {
        //console.log('hash_set_password')
        const bcrypt = require('bcrypt')

        const salt = await bcrypt.genSalt()
        res.locals.hashed_password = await bcrypt.hash(req.body.new_password, salt)
        return next()

    } catch (err) {
        return next(err)
    }
}

module.exports = hash_set_password