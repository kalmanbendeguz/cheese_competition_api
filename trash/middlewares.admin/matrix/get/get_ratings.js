const get_ratings = function() {

    return async function(req, res, next) {
        console.log('get_ratings')
        
        const Rating_Model = require('../../../config/db').mongoose.connection.db.collection('ratings')
        
        res.locals.ratings = await Rating_Model.find().toArray()
        
        return next()

    }
}

module.exports = get_ratings