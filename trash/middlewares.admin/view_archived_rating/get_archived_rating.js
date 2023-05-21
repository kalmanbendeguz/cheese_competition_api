const get_archived_rating = function() {

    const Archived_Rating_Model = require('../../models/Archived_Rating')

    return async function(req, res, next) {
        //console.log('get_archived_rating')

        res.locals.rating = 
            await Archived_Rating_Model.findOne({ 
                secret_id: req.query.secret_id,
                judge_email: req.query.judge_email
            })
        
        if(res.locals.rating) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Ez az archivált bírálat nem létezik.')
        return res.redirect('/authenticated_message')
        
    }
}

module.exports = get_archived_rating