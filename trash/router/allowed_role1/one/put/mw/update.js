module.exports = async function (req, res, next) {
    try {
        console.log('mw:update(product/one/put/mw/update)')

        res.locals.allowed_judge.set(res.locals.update)
        
        for(const key of res.locals.remove) {
            res.locals.allowed_judge[key] = undefined
        }

        return next()
    } catch (err) {
        return next(err)
    }
}