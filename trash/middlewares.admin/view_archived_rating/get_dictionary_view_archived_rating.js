const get_dictionary_view_archived_rating = function() {

    return function(req, res, next) {
        //console.log('get_dictionary_view_archived_rating')

        res.locals.dictionary = require('../../static/rating_sheets/dictionary')
        res.locals.category_dictionary = require('../../static/category_dictionary')
        
        return next()
    }
}

module.exports = get_dictionary_view_archived_rating