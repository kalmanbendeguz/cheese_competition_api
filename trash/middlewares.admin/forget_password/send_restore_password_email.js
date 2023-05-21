const send_restore_password_email = function() {
 
    require('dotenv').config()
    const nodemailer = require('nodemailer')
    const { google } = require('googleapis')
    const email_config = require('../../config/email_config')
    const OAuth2 = google.auth.OAuth2

    return async function(req, res, next) {
        console.log('send_restore_password_email')

        const oauth2_client = new OAuth2(email_config.client_id, email_config.client_secret)
        oauth2_client.setCredentials({ refresh_token: email_config.refresh_token })
        const accessToken = await oauth2_client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: email_config.user,
                clientId: email_config.client_id,
                clientSecret: email_config.client_secret,
                refreshToken: email_config.refresh_token,
                accessToken: accessToken
            }
        })

        const options = {
            from: 'Sajtkészítők Egyesülete <sajtkeszitokegyesulete@gmail.com>',
            to: req.body.email,
            subject: 'Sajtverseny jelszó-helyreállítás',
            text: `A jelszó-helyreállításhoz kérlek kattints a linkre: ${process.env.SERVER_URL}/restore_password?restore_id=${res.locals.restore_link_identifier}
\r\nEz egy automatikusan generált email, kérlek ne válaszolj rá!`
        }
        
        await transporter.sendMail(options)

        return next()
    }
}

module.exports = send_restore_password_email
