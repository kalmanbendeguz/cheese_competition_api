const get_rating_sheet = function() {

    const rating_map = require('../../static/json/rating_sheets/rating_map')

    return function(req, res, next) {
        try {
            //console.log('get_rating_sheet')
    
            const rating_sheet_identifier = rating_map[res.locals.category_string]
            const rating_sheet = require(`../../static/json/rating_sheets/${rating_sheet_identifier}`)
    
            res.locals.rating_sheet = JSON.parse(JSON.stringify(rating_sheet))
    
            res.locals.dictionary = require(`../../static/json/rating_sheets/dictionary`)
    
            res.locals.category_dictionary = require('../../static/category_dictionary')
            return next()
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = get_rating_sheet