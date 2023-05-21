const remove_temporary_rating = async function (req, res, next) {
    try {
        //console.log('remove_temporary_rating')

        await res.locals.temporary_rating.remove()

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = remove_temporary_rating