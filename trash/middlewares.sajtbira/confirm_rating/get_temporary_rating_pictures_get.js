const get_temporary_rating_pictures_get = async function (req, res, next) {
    try {
        //console.log('get_temporary_rating_pictures_get')

        if(!(req.user.table_leader ?? false)) return next()

        const temporary_rating_picture =
            await req.app.models.temporary_rating_picture.findOne({ confirm_id: req.query.confirm_id })

        res.locals.temporary_rating_pictures = temporary_rating_picture?.pictures ?? []
        
        return next()
    } catch (err) {
        return next(err)
    }

}

module.exports = get_temporary_rating_pictures_get