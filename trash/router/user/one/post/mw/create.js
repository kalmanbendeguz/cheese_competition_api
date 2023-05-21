module.exports = async function (req, res, next) {
    try {
        console.log('mw:create(product/one/post/mw/create)')

        const Product_Model = require('../../../../../../../models/Product')

        res.locals.product = new Product_Model(res.locals._product)
                
        return next()
    } catch (err) {
        return next(err)
    }
}