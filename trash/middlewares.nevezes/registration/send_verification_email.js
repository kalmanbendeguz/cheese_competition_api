const send_verification_email = async function (req, res, next) {
    try {
        //console.log('send_verification_email')
        const send_email = require('../../utils/send_email')

        const recipient = req.body.email
        const title = req.app.locals.dict[res.locals.lang].confirm_registration_email_title
        const html = `
            ${req.app.locals.dict[res.locals.lang].confirm_registration_please_click_on_link}
            ${process.env.SERVER_URL}/confirm_registration?confirm_id=${res.locals.confirm_id}
            <br>
            ${req.app.locals.dict[res.locals.lang].this_is_an_automatic_email_please_dont_answer}
            `

        await send_email(recipient, title, html)

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = send_verification_email
