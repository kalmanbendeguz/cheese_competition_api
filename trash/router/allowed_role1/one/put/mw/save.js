module.exports = async function (req, res, next) {
    try {
        console.log('mw:save(product/one/put/mw/save)')

        await res.locals.allowed_judge.save()
                
        return next()
    } catch (err) {
        return next(err)
    }
}