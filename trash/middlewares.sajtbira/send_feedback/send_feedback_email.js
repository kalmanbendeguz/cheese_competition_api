const send_feedback_email = async function (req, res, next) {
    try {
        //console.log('send_feedback_email')
        const send_email = require('../../utils/send_email')

        const recipients = ['kalmanbendeguz@gmail.com', 'kristof.kir@gmail.com']
        const title = `${process.env.APPLICATION_NAME} ${req.app.locals.dict[res.locals.lang].feedback} (${req.app.locals.dict[res.locals.lang].sender}: ${req?.user?.email ?? req.app.locals.dict[res.locals.lang].feedback_email_sender_not_logged_in})`
        const html = req.body.feedback_message

        for (const recipient of recipients) {
            await send_email(recipient, title, html)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = send_feedback_email