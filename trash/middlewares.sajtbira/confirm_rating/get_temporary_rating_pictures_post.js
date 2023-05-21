const get_temporary_rating_pictures_post = async function (req, res, next) {
    try {
        //console.log('get_temporary_rating_pictures_post')

        if(!(req.user.table_leader ?? false)) return next()

        res.locals.temporary_rating_picture =
            await req.app.models.temporary_rating_picture.findOne({ confirm_id: req.body.confirm_id })

        res.locals.temporary_rating_pictures = res.locals.temporary_rating_picture?.pictures ?? []
        
        return next()
    } catch (err) {
        return next(err)
    }

}

module.exports = get_temporary_rating_pictures_post