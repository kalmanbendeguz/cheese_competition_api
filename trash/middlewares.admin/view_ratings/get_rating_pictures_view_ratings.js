const get_rating_pictures_view_ratings = function() {

    return async function(req, res, next) {
        console.log('get_rating_pictures_view_ratings')

        res.locals.table_leader_rating = res.locals.ratings.find(rating => rating.table_leader)

        if(typeof res.locals.table_leader_rating === 'undefined' || !res.locals.table_leader_rating) return next()

        const Rating_Picture_Model = require('../../models/Rating_Picture')

        const rating_picture =
            await Rating_Picture_Model.findOne({ rating_id: res.locals.table_leader_rating._id })

        res.locals.rating_pictures = rating_picture?.pictures ?? []
        
        return next()

    }
}

module.exports = get_rating_pictures_view_ratings