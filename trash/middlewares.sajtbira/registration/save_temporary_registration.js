const save_temporary_registration = async function (req, res, next) {
    try {
        //console.log('save_temporary_registration')

        const { password, confirm_password, ...registration } = req.body
        registration.hashed_password = res.locals.hashed_password

        const judge = new req.app.models.judge_user(registration)

        await req.app.models.judge_temporary_registration.findOneAndUpdate({
            'user.email': req.body.email
        },
            { user: judge, confirm_id: res.locals.confirm_id },
            { upsert: true }
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = save_temporary_registration