const create_pending_payment = async function (req, res, next) {
    try {
        //console.log('create_pending_payment')

        const randomstring = require('randomstring')

        const pos_transaction_id = randomstring.generate(32)
        const confirm_payment_ids = res.locals.unpaid_cheeses.map(
            unpaid_cheese => unpaid_cheese.confirm_payment_id
        )

        res.locals.pending_payment = await req.app.models.pending_payment.create({
            pos_transaction_id: pos_transaction_id,
            confirm_payment_ids: confirm_payment_ids
        })
        
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = create_pending_payment