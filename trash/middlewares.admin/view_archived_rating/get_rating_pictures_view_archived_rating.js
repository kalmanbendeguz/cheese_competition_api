const get_rating_pictures_view_archived_rating = function() {

    return async function(req, res, next) {
        console.log('get_rating_pictures_view_archived_rating')

        if(!(res.locals?.rating?.table_leader ?? false)) return next()

        const Archived_Rating_Picture_Model = require('../../models/Archived_Rating_Picture')

        const rating_picture =
            await Archived_Rating_Picture_Model.findOne({ rating_id: res.locals.rating._id })

        res.locals.rating_pictures = rating_picture?.pictures ?? []

        return next()

    }
}

module.exports = get_rating_pictures_view_archived_rating