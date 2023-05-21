const get_ratings_of_cheese = function() {

    return async function(req, res, next) {
        console.log('get_ratings_of_cheese')
        
        const Rating_Model = require('../../config/db').mongoose.connection.db.collection('ratings')
        
        res.locals.ratings = await Rating_Model.find({secret_id: res.locals.cheese.secret_id}).toArray()

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

module.exports = get_ratings_of_cheese