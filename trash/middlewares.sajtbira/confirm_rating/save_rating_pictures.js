const save_rating_pictures = async function (req, res, next) {
    try {
        //console.log('save_rating_pictures')

        if(!(req.user.table_leader ?? false)) return next()

        const rating_picture = new req.app.models.rating_picture({
            rating_id: res.locals.rating.id,
            pictures: res.locals.temporary_rating_pictures
        })

        await rating_picture.save()

        return next()
    } catch (err) {
        return next(err)
    }
}


module.exports = save_rating_pictures