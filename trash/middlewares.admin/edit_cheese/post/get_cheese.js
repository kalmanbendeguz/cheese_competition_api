const get_cheese = function() {

    const Cheese_Model = require('../../../models/Cheese')

    return async function(req, res, next) {
        console.log('get_cheese')

        res.locals.cheese = await Cheese_Model.findOne({'public_id': req.body.public_id})

        if(res.locals.cheese)  return next()

        req.app.push_cookie_array(req, res, 'errors', 'Ezzel az azonosítóval nem létezik sajt.')

        return res.redirect('/authenticated_message')
    }
}

module.exports = get_cheese