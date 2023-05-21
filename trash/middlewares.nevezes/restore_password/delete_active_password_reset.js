const delete_active_password_reset = async function (req, res, next) {
    try {
        //console.log('delete_active_password_reset')

        await res.locals.active_password_reset.remove()

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = delete_active_password_reset