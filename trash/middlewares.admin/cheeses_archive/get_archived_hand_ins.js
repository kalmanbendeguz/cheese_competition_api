const get_archived_hand_ins = function() {

    const Archived_Hand_In_Model = require('../../models/Archived_Hand_In')

    return async function(req, res, next) {
        //console.log('get_archived_hand_ins')
        
        res.locals.hand_ins = await Archived_Hand_In_Model.find({}, {_id: 0}).lean()

        return next()

    }
}

module.exports = get_archived_hand_ins