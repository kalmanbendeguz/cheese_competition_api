const check_already_rated = function() {

    const Rating_Model = require('../../../models/Rating')

    return async function(req, res, next) {
        console.log('check_already_rated')

        const rating = await Rating_Model.findOne({ 
            secret_id: res.locals.secret_id,
            judge_email: req.user.email
        })

        if(!rating) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Ezt a sajtot már értékelted korábban.')
        return res.redirect('/authenticated_message')
    }
}

module.exports = check_already_rated