const get_cheese = function() {

    return async function(req, res, next) {
        console.log('get_cheese')

        const Cheese_Model = require('../../../config/db').mongoose.connection.db.collection('cheeses')

        res.locals.cheese = await Cheese_Model.findOne({ secret_id: req.query.secret_id })

        if(res.locals.cheese) return next()
        
        req.app.push_cookie_array(req, res, 'errors', 'Az értékelésben elmentett titkos azonosítóval nincs sajt az adatbázisban.')
        return res.redirect('/authenticated_message')
    }
}

module.exports = get_cheese