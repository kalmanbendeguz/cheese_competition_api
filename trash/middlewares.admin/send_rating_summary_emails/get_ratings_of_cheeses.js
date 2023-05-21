const get_ratings_of_cheeses = function() {

    return async function(req, res, next) {
        console.log('get_ratings_of_cheeses')
        
        const Rating_Model = require('../../config/db').mongoose.connection.db.collection('ratings')
        const User_Model = require('../../config/db').mongoose.connection.db.collection('users')
        const Judge_Model = require('../../config/db').mongoose.connection.db.collection('judge_users')

        for await (let cheese of res.locals.cheeses) {
            let manufacturer_of_cheese = await User_Model.findOne({_id: cheese.manufacturer})
            cheese.manufacturer = manufacturer_of_cheese

            let ratings_of_cheese = await Rating_Model.find({secret_id: cheese.secret_id}).toArray()
            cheese.ratings = ratings_of_cheese

            let total_score_of_cheese = 0

            for await (let rating of cheese.ratings){
                let judge_of_rating = await Judge_Model.findOne({email: rating.judge_email})
                rating.judge = judge_of_rating

                let sum_of_scores = 0
                rating.aspects.forEach(aspect => {
                    sum_of_scores += parseInt(aspect.score)
                })
                rating.total_score = sum_of_scores
                total_score_of_cheese += sum_of_scores
            }

            cheese.average_score = total_score_of_cheese / ratings_of_cheese.length
        }
        
        return next()

    }
}

module.exports = get_ratings_of_cheeses