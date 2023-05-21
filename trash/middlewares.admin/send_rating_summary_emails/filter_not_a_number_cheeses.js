const filter_not_a_number_cheeses = function() {

    return function(req, res, next) {
        console.log('filter_not_a_number_cheeses')
        
        res.locals.cheeses = res.locals.cheeses.filter(cheese => !isNaN(cheese.average_score))
        
        return next()

    }
}

module.exports = filter_not_a_number_cheeses