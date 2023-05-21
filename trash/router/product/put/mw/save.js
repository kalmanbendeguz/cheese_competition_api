module.exports = async function (req, res, next) {
    try {
        console.log('mw:save(product/many/put/mw/save)')

        const saver_promises = res.locals.products.map(product => product.save())

        await Promise.all(saver_promises)
                
        return next()
    } catch (err) {
        return next(err)
    }
}