const get_temporary_rating = function() {

    const Temporary_Rating_Model = require('../../../models/Temporary_Rating')

    return async function(req, res, next) {
        console.log('get_temporary_rating')

        res.locals.temporary_rating = 
            await Temporary_Rating_Model.findOne({ confirm_string: req.query.confirm_link_identifier })
        
        if(res.locals.temporary_rating) return next()

        ;(res.locals.messages ||= []).push('Ez az ideiglenes értékelés nem létezik.')
        return res.render('authenticated_message')
    }
}

module.exports = get_temporary_rating