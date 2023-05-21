const get_scores = function() {

    return async function(req, res, next) {
        console.log('get_scores')
        
        const Rating_Model = require('../../../config/db').mongoose.connection.db.collection('ratings')
        
        for (let cheese of res.locals.cheeses){
            const ratings_of_cheese = await Rating_Model.find({secret_id: cheese.secret_id}).toArray()
            let sum_of_scores = 0
            ratings_of_cheese.forEach(rating => {
                rating.aspects.forEach(aspect => {
                    sum_of_scores += parseInt(aspect.score)
                })
            })
            cheese.score = sum_of_scores
            cheese.number_of_ratings = ratings_of_cheese.length
            cheese.average_score = cheese.score / cheese.number_of_ratings
            cheese.average_score = Math.round(cheese.average_score)
        }
        
        return next()

    }
}

module.exports = get_scores