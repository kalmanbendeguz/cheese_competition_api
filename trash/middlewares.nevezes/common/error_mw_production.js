const error_mw_production = function (err, req, res, next) {
    try {
        //console.log('error_mw_production')

        const send_email = require('../../utils/send_email')

        let errtext = 'ERROR COULD NOT BE PARSED'
        try {
            errtext = require('util').inspect(err, { showHidden: false, depth: null, colors: false })
        } catch (e) {
            errtext = 'ERROR COULD NOT BE PARSED'
        }

        let errstacktext = 'ERROR STACK COULD NOT BE PARSED'
        try {
            errstacktext = require('util').inspect(err.stack, { showHidden: false, depth: null, colors: false })
        } catch (e) {
            errstacktext = 'ERROR STACK COULD NOT BE PARSED'
        }

        let reqtext = 'REQUEST COULD NOT BE PARSED'
        try {
            reqtext = require('util').inspect(req, { showHidden: false, depth: null, colors: false })
        } catch (e) {
            reqtext = 'REQUEST COULD NOT BE PARSED'
        }

        let restext = 'RESPONSE COULD NOT BE PARSED'
        try {
            restext = require('util').inspect(res, { showHidden: false, depth: null, colors: false })
        } catch (e) {
            restext = 'RESPONSE COULD NOT BE PARSED'
        }

        let html =
            `
                    <html>
                    <head>
                    </head>
                    <body>
                    ERROR<br>
                    ERR------------------------------------<br>
                    ${errtext}<br>
                    ERR.STACK------------------------------<br>
                    ${errstacktext}<br>
                    REQUEST--------------------------------<br>
                    ${reqtext}<br>
                    RESPONSE------------------------------<br>
                    ${restext}<br>
                    </body>
                    </html>
                `

        let errmessage = 'ERROR MESSAGE COULD NOT BE PARSED'
        try {
            errmessage = err.message
        } catch (e) {
            errmessage = 'ERROR MESSAGE COULD NOT BE PARSED'
        }

        res.status(500).render('error', { error: errmessage })

        const now = new Date()
        send_email(
            `${process.env.ERROR_EMAIL_RECIPIENT}`,
            `${process.env.APPLICATION_NAME} APP ERROR ${now.toISOString()}`,
            html
        )

    } catch (e) {

        let errortext = 'ERROR COULDNT BE PARSED'
        try {
            errortext = JSON.stringify(e)
        } catch (e1) {
            errortext = 'ERROR COULDNT BE PARSED'
        }

        const now1 = new Date()

        send_email(
            `${process.env.ERROR_EMAIL_RECIPIENT}`,
            `${process.env.APPLICATION_NAME} APP CRASHED ${now1.toISOString()}`,
            errortext
        )
        res.status(500).render('error', { error: errortext })
    } finally {
        return
    }
}

module.exports = error_mw_production