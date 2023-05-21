const validate_registration = function (req, res, next) {
    try {
        //console.log('validate_registration')
        const validator = require('email-validator')

        let problems = []

        if (!validator.validate(req.body.email)) {
            problems.push(req.app.locals.dict[res.locals.lang].invalid_email)
        }
        // kisbetű, nagybetű, szám, min 8, max 25 karakter
        if (req.body.password.length < 8) {
            problems.push(req.app.locals.dict[res.locals.lang].password_too_short)
        }
        if (req.body.password.length > 25) {
            problems.push(req.app.locals.dict[res.locals.lang].password_too_long)
        }
        if (req.body.password === req.body.password.toUpperCase()) {
            problems.push(req.app.locals.dict[res.locals.lang].password_must_contain_lowercase)
        }
        if (req.body.password === req.body.password.toLowerCase()) {
            problems.push(req.app.locals.dict[res.locals.lang].password_must_contain_uppercase)
        }
        const hasNumber = /\d/
        if (!hasNumber.test(req.body.password)) {
            problems.push(req.app.locals.dict[res.locals.lang].password_must_contain_number)
        }
        if (req.body.password !== req.body.confirm_password) {
            problems.push(req.app.locals.dict[res.locals.lang].passwords_dont_match)
        }
        if (req.body.full_name.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].full_name_field_empty)
        }
        if (req.body.contact_phone_number.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].contact_phone_number_empty)
        }
        if (req.body.billing_name.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].billing_name_empty)
        }
        if (req.body.billing_zip.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].billing_zip_empty)
        }
        if (req.body.billing_city.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].billing_city_empty)
        }
        if (req.body.billing_street.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].billing_street_empty)
        }
        if (req.body.billing_street_type.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].billing_street_type_empty)
        }
        if (req.body.billing_house_number.length === 0) {          
            problems.push(req.app.locals.dict[res.locals.lang].billing_house_number_empty)
        }
        
        if (req.body.general_terms_and_condition_check !== 'approved') {          
            problems.push(req.app.locals.dict[res.locals.lang].general_terms_and_condition_not_approved)
        }

        if (problems.length === 0) return next()

        const { password, confirm_password, ...body_without_password } = req.body
        req.app.set_session_contexts(req.session, body_without_password)
        for (const problem of problems) {
            req.app.set_session_context(req.session, 'errors', problem)
        }

        return res.redirect('/registration')

    } catch (err) {
        return next(err)
    }
}

module.exports = validate_registration