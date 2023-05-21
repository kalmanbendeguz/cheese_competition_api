const remove_temporary_rating = function() {

    return async function(req, res, next) {
        console.log('remove_temporary_rating')

        await res.locals.temporary_rating.remove()

        return next()
    }
}

module.exports = remove_temporary_rating