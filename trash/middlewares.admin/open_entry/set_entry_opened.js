const set_entry_opened = function() {

    const Key_Value_Model = require('../../models/Key_Value')

    return async function(req, res, next) {
        console.log('set_entry_opened')

        await Key_Value_Model.findOneAndUpdate(
            { key: 'entry_opened'}, 
            { value: true},
            { upsert: true }
        )

        const now = new Date()

        await Key_Value_Model.findOneAndUpdate(
            { key: 'entry_open_time'}, 
            { value: now },
            { upsert: true }
        )

        return next()

    }
}

module.exports = set_entry_opened