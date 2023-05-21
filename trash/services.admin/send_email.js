require('dotenv').config()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const email_config = require('../config/email_config')
const OAuth2 = google.auth.OAuth2

const send_email = async function(recipient, title, text) {
    try{
    console.log('send_email')
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
        to: recipient,
        subject: title,
        html: text
    }
    
    await transporter.sendMail(options)

    return
    } catch (err){
        console.log(err)
    }
    
}

module.exports = send_email