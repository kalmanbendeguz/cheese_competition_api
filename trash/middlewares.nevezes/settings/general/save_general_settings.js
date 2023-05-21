const save_general_settings = async function (req, res, next) {
    try {
        //console.log('save_general_settings')

        await req.app.models.user.updateOne(
            {
                email: req.user.email
            },
            {
                $set: {
                    full_name: req.body.full_name,
                    contact_phone_number: req.body.contact_phone_number
                }
            }
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = save_general_settings