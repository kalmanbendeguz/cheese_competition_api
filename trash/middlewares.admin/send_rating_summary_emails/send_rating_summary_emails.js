const send_rating_summary_emails = function() {
 
    require('dotenv').config()
    const nodemailer = require('nodemailer')
    const { google } = require('googleapis')
    const email_config = require('../../config/email_config')
    const OAuth2 = google.auth.OAuth2
    let dictionary = require('../../static/dictionary')

    return async function(req, res, next) {
        console.log('send_rating_summary_emails')

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


        for await (let cheese of res.locals.cheeses){

            let qualification_text = ``

            if(cheese.average_score >= 84.5) {
                let qualification = ''
                if (cheese.average_score <= 100 && cheese.average_score >= 94.5) {
                    qualification = 'ARANY'
                } else if (cheese.average_score < 94.5 && cheese.average_score >= 89.5) {
                    qualification = 'EZÜST'
                } else if (cheese.average_score < 89.5 && cheese.average_score >= 84.5) {
                    qualification = 'BRONZ'
                }

                qualification_text = 
                `
                <b>${qualification} minősítést szerzett.</b>
                <br>Elért pontszám: ${Math.round(cheese.average_score)}
                `
            } else {
                qualification_text = 
                `
                <b>${Math.round(cheese.average_score)} pontot ért el.</b>
                `
            }

            let table =
            `<table>
                <tr>
                   <th>Bíra</th>
                   <th>Adott pontszám</th>
                   <th>Összbenyomás</th>
                </tr>`

            for (let rating of cheese.ratings){
                table += '<tr>'
                if(!rating.anonymous){
                    table += `<td>${rating.judge.full_name}</td>`
                } else {
                    table += `<td><i>ANONIM</i></td>`
                }
                table += `<td>${rating.total_score}</td>`
                table += `<td>${rating.overall_impression}</td>`
                table += '</tr>'
            }

            table += `</table>`

            const options = {
                from: 'Sajtkészítők Egyesülete <sajtkeszitokegyesulete@gmail.com>',
                to: cheese.manufacturer.email,
                subject: `Sajtmustra bírálati összesítő: ${cheese.public_id}`,
                html:`
                <html>
                <head>
                    <style>
                        td {
                            text-align:center;
                        }
                        th{
                            text-align:center;
                        }
                        table, td, th {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                    </style>
                </head>
                <body>
                Tisztelt ${cheese.manufacturer.full_name}!
                <br><br>A(z) ${cheese.public_id} azonosítójú,
                <br>${cheese.factory_name} által készített,
                <br>${dictionary[cheese.product_category_list[0]]} / ${dictionary[cheese.product_category_list[cheese.product_category_list.length -1]]} kategóriában nevezett,
                <br>${cheese.product_name} megnevezésű terméke
                <br><br>${qualification_text}
                <br><br>A termékre érkezett bírálatok:
                <br><br>${table}
                <br>Eredményéhez gratulálunk!
                <br>Magyar Sajtkészítők Egyesülete
                </body>
                </html>
                `
            }
            
            await transporter.sendMail(options)
        }

        return next()
    }
}

module.exports = send_rating_summary_emails
