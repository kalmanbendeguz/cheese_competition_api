const get_paid_competition_info = async function (req, res, next) {
    try {
       

        res.locals.paid_competition = (await req.app.models.key_value.findOne({ key: 'paid_competition' }))?.value
        console.log(typeof res.locals.paid_competition)

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = get_paid_competition_info