const get_hand_ins = function() {

    const Hand_In_Model = require('../../models/Hand_In')

    return async function(req, res, next) {
        console.log('get_hand_ins')
        
        res.locals.hand_ins = await Hand_In_Model.find({}, {_id: 0}).lean()

        return next()

    }
}

module.exports = get_hand_ins