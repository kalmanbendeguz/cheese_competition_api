const get_archived_cheese_view_archived_rating = function() {

    const Archived_Cheese_Model = require('../../models/Archived_Cheese')

    return async function(req, res, next) {
        //console.log('get_archived_cheese_view_archived_rating')

        res.locals.cheese = await Archived_Cheese_Model.findOne({ secret_id: req.query.secret_id })

        if(res.locals.cheese) return next()
        
        req.app.push_cookie_array(req, res, 'errors', 'Az archív értékelésben elmentett titkos azonosítóval nincs archív termék az adatbázisban.')
        return res.redirect('/authenticated_message')
    }
}

module.exports = get_archived_cheese_view_archived_rating