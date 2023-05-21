const generate_link = function() {
 
    const randomstring = require('randomstring')

    return function(req, res, next) {
        console.log('generate_link')

        res.locals.confirm_link_identifier = randomstring.generate(32)
        
        return next()
    }
}

module.exports = generate_link