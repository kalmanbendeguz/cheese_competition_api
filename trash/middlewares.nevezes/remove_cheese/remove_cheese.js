const remove_cheese = async function (req, res, next) {
    try {
        //console.log('remove_cheese')

        await req.app.models.unpaid_cheese.findByIdAndDelete(res.locals.unpaid_cheese._id)

        return next()

    } catch (err) {
        return next(err)
    }
}

module.exports = remove_cheese