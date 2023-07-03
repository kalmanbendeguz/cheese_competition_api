const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const email_config = require('../config/email')
const OAuth2 = google.auth.OAuth2

const send_email = async function (recipient, title, html) {
    try {
        const oauth2_client = new OAuth2(
            email_config.client_id,
            email_config.client_secret
        )
        oauth2_client.setCredentials({ refresh_token: email_config.refresh_token })
        const access_token = await oauth2_client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: email_config.user,
                clientId: email_config.client_id,
                clientSecret: email_config.client_secret,
                refreshToken: email_config.refresh_token,
                accessToken: access_token,
            },
        })

        const sender = `${email_config.friendly_name} <${email_config.user}>`

        const options = {
            from: sender,
            to: recipient,
            subject: title,
            html: html,
        }

        const sent_message_info = await transporter.sendMail(options)

        const response_code = sent_message_info.response.slice(0,3)
        const response_code_number = Number(response_code)

        if(!isNaN(response_code_number) && response_code_number >= 200 && response_code_number <= 299){
            return
        }

        console.log('EMAIL SENDING FAILED, RESPONSE OBJECT:')
        const util = require('util')
        const sent_message_info_string = util.inspect(sent_message_info, {
            showHidden: false,
            depth: null,
            colors: false
        })
        console.log(sent_message_info_string)

        const error_forward_email_options = {
            from: sender,
            to: process.env.ERROR_EMAIL_RECIPIENT,
            subject: `${process.env.APPLICATION_NAME} EMAIL SENDING FAILED`,
            html: sent_message_info_string,
        }

        const error_email_sent_message_info = await transporter.sendMail(error_forward_email_options)

        const error_email_response_code = error_email_sent_message_info.response.slice(0,3)
        const error_email_response_code_number = Number(error_email_response_code)

        if(!isNaN(error_email_response_code_number) && error_email_response_code_number >= 200 && error_email_response_code_number <= 299){
            return
        }

        console.log('ERROR EMAIL SENDING FAILED TOO, RESPONSE OBJECT:')
        const error_email_sent_message_info_string = util.inspect(error_email_sent_message_info, {
            showHidden: false,
            depth: null,
            colors: false
        })
        console.log(error_email_sent_message_info_string)

        return
    } catch (err) {
        console.log(err)
    }
}

module.exports = send_email