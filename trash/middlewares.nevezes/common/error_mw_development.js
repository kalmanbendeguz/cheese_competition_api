const error_mw_development = function (err, req, res, next) {
    try {
        console.log('error_mw_development')

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

        res.status(500).send(html)
    } catch (e) {
        let errortext = 'ERROR COULD NOT BE PARSED'
        try {
            errortext = JSON.stringify(e)
        } catch (e1) {
            errortext = 'ERROR COULD NOT BE PARSED'
        }

        res.status(500).send(errortext)
    } finally {
        return
    }
}

module.exports = error_mw_development