const get_archived_cheeses = function() {

    const Archived_Cheese_Model = require('../../models/Archived_Cheese')

    return async function(req, res, next) {
        //console.log('get_archived_cheeses')
        
        res.locals.cheeses = await Archived_Cheese_Model.find()

        return next()

    }
}

module.exports = get_archived_cheeses