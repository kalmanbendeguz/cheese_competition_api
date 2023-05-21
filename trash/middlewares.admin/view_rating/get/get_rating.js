const get_rating = function() {

    return async function(req, res, next) {
        console.log('get_rating')

        const Rating_Model = require('../../../config/db').mongoose.connection.db.collection('ratings')

        res.locals.rating = 
            await Rating_Model.findOne({ 
                secret_id: req.query.secret_id,
                judge_email: req.query.judge_email
            })
        
        if(res.locals.rating) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Ez az ideiglenes értékelés nem létezik.')
        return res.redirect('/authenticated_message')
        
    }
}

module.exports = get_rating