const take_cheese = function() {

    const Hand_In_Model = require('../../models/Hand_In')

    return async function(req, res, next) {
        console.log('take_cheese')

        await Hand_In_Model.findOneAndUpdate({
            public_id: req.query.public_id
        }, 
        {   
            public_id: req.query.public_id
        }, 
        { upsert: true }
        )
        
        return next()
    }
}

module.exports = take_cheese