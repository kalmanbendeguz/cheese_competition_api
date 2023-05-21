const get_receipt_settings = function() {

    const Key_Value_Model = require('../../../models/Key_Value')

    return async function(req, res, next) {
        //try{
            console.log('get_receipt_settings')

            res.locals.receipt_settings = {}
    
            res.locals.receipt_settings.competition_name = (await Key_Value_Model.findOne({key: 'competition_name'}))?.value
            res.locals.receipt_settings.competition_location = (await Key_Value_Model.findOne({key: 'competition_location'}))?.value
            res.locals.receipt_settings.entry_fee_amount = (await Key_Value_Model.findOne({key: 'entry_fee_amount'}))?.value
            res.locals.receipt_settings.entry_fee_currency = (await Key_Value_Model.findOne({key: 'entry_fee_currency'}))?.value
            res.locals.receipt_settings.paid_competition = (await Key_Value_Model.findOne({key: 'paid_competition'}))?.value
    
            console.log(res.locals.receipt_settings.paid_competition)
    
            return next()
        //} catch(err){
            return next(err)
        //}
        

    }
}

module.exports = get_receipt_settings