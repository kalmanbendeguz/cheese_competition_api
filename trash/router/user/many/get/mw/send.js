module.exports = function (req, res, next) {
    try {
        console.log('mw:send(product/many/get/mw/send)')

        return res.status(200).json(res.locals.products)
        
    } catch (err) {
        return next(err)
    }
}