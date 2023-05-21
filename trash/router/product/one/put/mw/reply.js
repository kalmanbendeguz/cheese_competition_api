module.exports = function (req, res, next) {
    try {
        console.log('mw:reply(product/one/put/mw/reply)')

        const resource_query = req.user.role === 'competitor' 
        ?
        `public_id=${res.locals.product.public_id}`
        :
        `_id=${res.locals.product._id}` 

        res.location(`/api/a/product/o?${resource_query}`)

        return res.sendStatus(200)
        
    } catch (err) {
        return next(err)
    }
}