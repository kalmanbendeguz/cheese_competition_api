const validator = require('email-validator');

const check_email_valid = function(){

    return function(req, res, next) {
        console.log('check_email_valid')

        if(validator.validate(req.body.email)) return next()

        ;(res.locals.messages ||= []).push('Invalid e-mail cím.')
        return res.render('unauthenticated_message')

    }
}

module.exports = check_email_valid