const remove_temporary_cheese = async function (req, res, next) {
    try {
        //console.log('remove_temporary_cheese')

        await req.app.models.temporary_cheese.deleteOne({ confirm_id: req.body.confirm_id })

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = remove_temporary_cheese