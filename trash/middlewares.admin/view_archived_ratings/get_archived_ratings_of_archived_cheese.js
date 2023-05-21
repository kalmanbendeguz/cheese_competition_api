const get_archived_ratings_of_archived_cheese = function() {

    const Archived_Rating_Model = require('../../models/Archived_Rating')

    return async function(req, res, next) {
        //console.log('get_archived_ratings_of_archived_cheese')
        
        res.locals.ratings = await Archived_Rating_Model.find({secret_id: res.locals.cheese.secret_id})

        let total_score = 0

        res.locals.ratings.forEach(rating => {
            let sum_of_scores = 0
            rating.aspects.forEach(aspect => {
                sum_of_scores += parseInt(aspect.score)
            })
            rating.total_score = sum_of_scores
            total_score += sum_of_scores
        })

        res.locals.cheese.average_score = total_score / res.locals.ratings.length
        
        return next()

    }
}

module.exports = get_archived_ratings_of_archived_cheese