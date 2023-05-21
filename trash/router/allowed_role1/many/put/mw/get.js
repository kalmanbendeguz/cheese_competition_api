module.exports = async function (req, res, next) {
    try {
        console.log('mw:get(product/many/put/mw/get)')

        const Allowed_Judge_Model = require('../../../../../../../models/Allowed_Role')

        res.locals.allowed_judges = await Allowed_Judge_Model.find(res.locals.filter)

        //if(!res.locals.product) return res.sendStatus(404) // seamlessly proceed if no product found

        return next()
    } catch (err) {
        return next(err)
    }
}