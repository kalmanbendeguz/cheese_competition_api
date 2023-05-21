const save_entry_certificate = async function (req, res, next) {
    try {
        //console.log('save_entry_certificate')
        
        await req.app.models.entry_certificate.create({ 
            user_id: req.user._id,
            product_id: res.locals.cheese._id
        })

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = save_entry_certificate