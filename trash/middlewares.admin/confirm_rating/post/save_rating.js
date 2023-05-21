const save_rating = function() {
 
    const Rating_Model = require('../../../models/Rating')

    return async function(req, res, next) {
        console.log('save_rating')

        const rating = new Rating_Model(res.locals.temporary_rating.rating.toObject())
        
        await rating.save()
        
        return next()
    }
}

module.exports = save_rating