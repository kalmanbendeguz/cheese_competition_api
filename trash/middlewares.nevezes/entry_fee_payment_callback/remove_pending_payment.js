const remove_pending_payment = async function (req, res, next) {
    try {
        //console.log('remove_pending_payment')

        await req.app.models.pending_payment.findByIdAndDelete(res.locals.pending_payment._id)

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = remove_pending_payment