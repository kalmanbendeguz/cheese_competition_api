const get_judge = function() {

    return async function(req, res, next) {
        //console.log('get_judge')

        const Judge_Model = require('../../config/db').mongoose.connection.db.collection('judge_users')

        res.locals.judge = 
            await Judge_Model.findOne({ email: res.locals.rating.judge_email })
        
        if(res.locals.judge) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Az értékeléshez nem tartozik bíra.')
        return res.redirect('/authenticated_message')
        
    }
}

module.exports = get_judge