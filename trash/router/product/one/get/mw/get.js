module.exports = async function (req, res, next) {
    try {
        console.log('mw:get(product/one/get/mw/get)')

        const Product_Model = require('../../../../../../../models/Product')

        res.locals.product = await Product_Model.findOne(
            res.locals.filter,
            res.locals.projection,
            { lean: true }
        )

        if(!res.locals.product) return res.sendStatus(404)

        return next()
    } catch (err) {
        return next(err)
    }
}