const get_receipt_settings = async function (req, res, next) {
    try {
        console.log('most tettem bele')

        const paid_competition = await req.app.models.key_value.findOne({ key: 'paid_competition' })
        //console.log(paid_competition)
        
        if (paid_competition.value === true) return next()

        req.session.locals = res.locals

        return res.redirect('/save_entry_certificate')
    } catch (err) {
        return next(err)
    }

}

module.exports = get_receipt_settings