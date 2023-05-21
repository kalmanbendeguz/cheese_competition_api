const get_cheese = function() {

    return async function(req, res, next) {
        console.log('get_cheese')

        const Cheese_Model = require('../../config/db').mongoose.connection.db.collection('cheeses')
        const User_Model = require('../../config/db').mongoose.connection.db.collection('users')

        res.locals.cheese = await Cheese_Model.findOne({'public_id': req.query.public_id})

        res.locals.receipt_user = await User_Model.findOne({_id: res.locals.cheese.manufacturer})

        if(res.locals.cheese) return next()

        req.app.push_cookie_array(req, res, 'errors', 'Ezzel az azonosítóval nem létezik sajt.')

        return res.redirect('/authenticated_message')
    }
}

module.exports = get_cheese