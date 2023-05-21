module.exports = async function (req, res, next) {
    try {
        console.log('mw:prepare_get(product/one/put/mw/prepare_get)')

        // GOAL: PRODUCE FILTER OBJECT COMPLETELY. NO ERRORS OR DENIALS SHOULD HAPPEN HERE
        // BUT CONDITIONAL LOGIC CAN TAKE PLACE

        res.locals.filter = {
            ...(req.query._id && { _id: req.query._id }),
            ...(req.query.email && { email: req.query.email }), // we know only organizers will use this.
        }

        return next()
    } catch (err) {
        return next(err)
    }
}
