const get_archived_rating_pictures = async function (req, res, next) {
    try {
        //console.log('get_archived_rating_pictures')

        //if( !(req.user.table_leader ?? false) || !(res.locals.rating_archived ?? false)) return next()

        const table_leader_rating = 
            await req.app.models.archived_rating.findOne({ 
                secret_id: res.locals.rating.secret_id,
                table_leader: true
            })

        if(!table_leader_rating) return next()

        const rating_picture =
            await req.app.models.archived_rating_picture.findOne({ rating_id: table_leader_rating.id })

        res.locals.rating_pictures = rating_picture?.pictures ?? []
        
        return next()
    } catch (err) {
        return next(err)
    }

}

module.exports = get_archived_rating_pictures