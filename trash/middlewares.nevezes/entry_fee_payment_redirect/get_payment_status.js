const get_payment_status = async function (req, res, next) {
    try {
        //console.log('get_payment_status')
        const barion = require('../../config/barion')

        const get_payment_state = async () => 
            barion.getPaymentState({PaymentId: req.query.paymentId}, (err, data) => { return {err, data} })
        const state = await get_payment_state()
    
        if(state?.err) throw new Error(state.err)
        if(!state?.data) throw new Error(req.app.locals.dict[res.locals.lang].barion_error_getpaymentstate_returned_no_data)

        res.locals.payment_status = state.data.Status

        return next()

    } catch (err) {
        return next(err)
    }
}

module.exports = get_payment_status