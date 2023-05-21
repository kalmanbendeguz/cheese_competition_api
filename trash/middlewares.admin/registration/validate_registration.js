const validator = require('email-validator');

const validate_registration = function(){
    return function(req, res, next) {
        console.log('validate_registration')

        let data_invalid = false

        if(typeof req.body === 'undefined') {
            (res.locals.messages ||= []).push('Request does not have a body!')
            data_invalid = true
        }

        if( !validator.validate(req.body.email) ) {
            (res.locals.errors ||= []).push('Invalid e-mail cím!')
            data_invalid = true
        } 

        if( req.body.password.length < 8) {
            (res.locals.errors ||= []).push('A jelszó legalább 8 karakter kell legyen!')
            data_invalid = true
        } 
        if( req.body.password.length > 25) {
            (res.locals.errors ||= []).push('A jelszó maximum 25 karakter lehet!')
            data_invalid = true
        }
        if( req.body.password === req.body.password.toUpperCase()) {
            (res.locals.errors ||= []).push('A jelszónak tartalmaznia kell legalább egy kisbetűt!')
            data_invalid = true
        }
        if( req.body.password === req.body.password.toLowerCase()) {
            (res.locals.errors ||= []).push('A jelszónak tartalmaznia kell legalább egy nagybetűt!')
            data_invalid = true
        } 
        const hasNumber = /\d/
        if( !hasNumber.test(req.body.password)) {
            (res.locals.errors ||= []).push('A jelszónak tartalmaznia kell legalább egy számot!')
            data_invalid = true
        }
        if( req.body.password !== req.body.confirm_password) {
            (res.locals.errors ||= []).push('A jelszavak nem egyeznek!')
            data_invalid = true
        }
        if( req.body.full_name.length === 0) {
            (res.locals.errors ||= []).push(`A "Teljes név" mező üres!`)
            data_invalid = true
        }

        if(data_invalid) {
            res.locals.registration = req.body
            delete res.locals.registration.password
            delete res.locals.registration.confirm_password
    
            return res.render('registration')
        } 
        
        return next()
    
    }
}

module.exports = validate_registration