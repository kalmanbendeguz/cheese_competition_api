const set_competition_opened = function() {

    const Key_Value_Model = require('../../models/Key_Value')

    return async function(req, res, next) {
        console.log('set_competition_opened')

        await Key_Value_Model.findOneAndUpdate(
            { key: 'competition_opened'}, 
            { value: true},
            { upsert: true }
        )

        const now = new Date()

        await Key_Value_Model.findOneAndUpdate(
            { key: 'competition_open_time'}, 
            { value: now },
            { upsert: true }
        )

        return next()

    }
}

module.exports = set_competition_opened