const get_payment_information = async function (req, res, next) {
    try {
        //console.log('get_payment_information')

        if(res.locals.unpaid_cheeses.length === 0) return next()

        res.locals.entry_fee_amount = (await req.app.models.key_value.findOne({ key: 'entry_fee_amount' }))?.value
        res.locals.entry_fee_currency = (await req.app.models.key_value.findOne({ key: 'entry_fee_currency' }))?.value
        res.locals.paid_competition = (await req.app.models.key_value.findOne({ key: 'paid_competition' }))?.value
        
        

        const Fraction = require('fraction.js')
        res.locals.entry_fee_total = Fraction(res.locals.unpaid_cheeses.length).mul(res.locals.entry_fee_amount).toString()

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = get_payment_information