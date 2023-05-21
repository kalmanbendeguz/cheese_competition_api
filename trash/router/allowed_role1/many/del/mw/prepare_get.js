module.exports = async function (req, res, next) {
    try {
        console.log('mw:prepare_get(product/many/del/mw/prepare_get)')

        // GOAL: PRODUCE FILTER AND PROJECTION OBJECTS COMPLETELY. NO ERRORS OR DENIALS SHOULD HAPPEN HERE
        // BUT CONDITIONAL LOGIC CAN TAKE PLACE

        // id
        // manufacturer_id
        // public_id
        // secret_id

        // only organizers use this endpoint
        res.locals.filter = {
            ...(req.query._id && { _id: req.query._id }),
            ...(req.query.email && { email: req.query.email }),
        }

        return next()
    } catch (err) {
        return next(err)
    }
}
