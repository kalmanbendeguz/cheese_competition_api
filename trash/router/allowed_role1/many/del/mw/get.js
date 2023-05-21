module.exports = async function (req, res, next) {
    try {
        console.log('mw:get(product/many/del/mw/get)')

        const Allowed_Judge_Model = require('../../../../../../../models/Allowed_Role')

        res.locals.allowed_judges = await Allowed_Judge_Model.find(res.locals.filter)
        // seamlessly proceed if the array is empty

        return next()
    } catch (err) {
        return next(err)
    }
}