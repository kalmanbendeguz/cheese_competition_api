const get_rating_pictures = async function (req, res, next) {
    try {
        //console.log('get_rating_pictures')

        if(!(req.user.table_leader ?? false)) return next()

        const rating_picture =
            await req.app.models.rating_picture.findOne({ rating_id: res.locals.rating.id })

        res.locals.rating_pictures = rating_picture?.pictures ?? []
        
        return next()
    } catch (err) {
        return next(err)
    }

}

module.exports = get_rating_pictures