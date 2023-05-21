const save_receipt_settings = function() {

    const Key_Value_Model = require('../../../models/Key_Value')

    return async function(req, res, next) {
        console.log('save_receipt_settings')

        await Key_Value_Model.findOneAndUpdate(
            { key: 'competition_name'}, 
            { value: req.body.competition_name},
            { upsert: true }
        )

        await Key_Value_Model.findOneAndUpdate(
            { key: 'competition_location'}, 
            { value: req.body.competition_location},
            { upsert: true }
        )

        await Key_Value_Model.findOneAndUpdate(
            { key: 'entry_fee_amount'}, 
            { value: req.body.entry_fee_amount},
            { upsert: true }
        )

        await Key_Value_Model.findOneAndUpdate(
            { key: 'entry_fee_currency'}, 
            { value: req.body.entry_fee_currency},
            { upsert: true }
        )

        console.log(req.body.entry_fee_currency)
        console.log(req.body.paid_competition)
        
        if(typeof req.body.paid_competition !== 'undefined'){
            await Key_Value_Model.findOneAndUpdate(
                { key: 'paid_competition'}, 
                { value: true},
                { upsert: true }
            )
        } else {
            await Key_Value_Model.findOneAndUpdate(
                { key: 'paid_competition'}, 
                { value: false},
                { upsert: true }
            )
        }

        return next()

    }
}

module.exports = save_receipt_settings