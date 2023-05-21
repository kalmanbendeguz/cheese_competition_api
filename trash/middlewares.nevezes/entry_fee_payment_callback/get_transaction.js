const get_transaction = async function (req, res, next) {
    try {
        //console.log('get_transaction')

        for(let transaction of res.locals.payment.Transactions) {
            res.locals.pending_payment = 
                await req.app.models.pending_payment.findOne({pos_transaction_id: transaction.POSTransactionId})
            if(res.locals.pending_payment) {
                res.locals.transaction = transaction
                break
            }
        }

        if(!res.locals.pending_payment || !res.locals.transaction) return res.sendStatus(200)

        return next()

    } catch (err) {
        return next(err)
    }
}

module.exports = get_transaction