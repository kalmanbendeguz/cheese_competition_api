module.exports = async function (req, res, next) {
    try {
        console.log('mw:reply(product/one/post/mw/reply)')

        // only competitors use this, so it can be the public id unconditionally
        res.location(`/api/a/product/o?public_id=${res.locals.product.public_id}`)

        return res.sendStatus(201)

    } catch (err) {
        return next(err)
    }
}