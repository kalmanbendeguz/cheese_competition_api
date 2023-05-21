const save_unpaid_cheese = async function (req, res, next) {
    try {
        //console.log('save_unpaid_cheese')
        const randomstring = require('randomstring')

        let confirm_payment_id
        let collision

        do {
            confirm_payment_id = randomstring.generate(32)
            collision = await req.app.models.unpaid_cheese.exists({ 'confirm_payment_id': confirm_payment_id })
        } while (collision)

        await req.app.models.unpaid_cheese.create({
            product: res.locals.cheese,
            confirm_payment_id: confirm_payment_id
        })

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = save_unpaid_cheese