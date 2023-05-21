const redirect_to_confirm_cheese = function (req, res, next) {
    try {
        //console.log('redirect_to_confirm_cheese')

        return res.redirect(`/confirm_cheese?confirm_id=${res.locals.confirm_id}`)
    } catch (err) {
        return next(err)
    }
}

module.exports = redirect_to_confirm_cheese