const get_coordination_state = function() {
 
    const Key_Value_Model = require('../../models/Key_Value')

    return async function(req, res, next) {
        console.log('get_coordination_state')

        let entry_opened = await Key_Value_Model.findOne({ key: 'entry_opened' })
        let entry_open_time = await Key_Value_Model.findOne({ key: 'entry_open_time' })
        let entry_close_time = await Key_Value_Model.findOne({ key: 'entry_close_time' })

        let competition_opened = await Key_Value_Model.findOne({ key: 'competition_opened' })
        let competition_open_time = await Key_Value_Model.findOne({ key: 'competition_open_time' })
        let competition_close_time = await Key_Value_Model.findOne({ key: 'competition_close_time' })

        let competition_reset_time = await Key_Value_Model.findOne({ key: 'competition_reset_time' })
        
        if(entry_opened) res.locals.entry_opened = entry_opened.value
        if(entry_open_time) res.locals.entry_open_time = entry_open_time.value
        if(entry_close_time) res.locals.entry_close_time = entry_close_time.value

        if(competition_opened) res.locals.competition_opened = competition_opened.value
        if(competition_open_time) res.locals.competition_open_time = competition_open_time.value
        if(competition_close_time) res.locals.competition_close_time = competition_close_time.value

        if(competition_reset_time) res.locals.competition_reset_time = competition_reset_time.value
        
        return next()
    }
}

module.exports = get_coordination_state