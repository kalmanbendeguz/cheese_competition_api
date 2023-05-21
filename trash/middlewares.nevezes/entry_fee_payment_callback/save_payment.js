const save_payment = async function (req, res, next) {
    try {
        //console.log('save_payment')
            
        await req.app.models.entry_fee_payment.create({
            cheese_ids: res.locals.cheeses.map(cheese => cheese._id),
            amount: res.locals.transaction.Items[0].ItemTotal,
            currency: res.locals.transaction.Currency,
            barion_payment_id: res.locals.payment.PaymentId,
            barion_transaction_id: res.locals.transaction.TransactionId
        })

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = save_payment