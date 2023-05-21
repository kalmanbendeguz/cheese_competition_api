module.exports = async function (req, res, next) {
    try {
        console.log('mw:create(product/one/post/mw/create)')

        const Allowed_Judge_Model = require('../../../../../../../models/Allowed_Role')

        res.locals.allowed_judges =
            res.locals._allowed_judges.map(allowed_judge => new Allowed_Judge_Model(allowed_judge))

        return next()
    } catch (err) {
        return next(err)
    }
}