const send_restore_password_email = async function (req, res, next) {
  try {
    //console.log('send_restore_password_email')
    const send_email = require("../../utils/send_email");

    const recipient = req.body.email;
    const title = "Sajtverseny jelszó-helyreállítás";
    const html = `
            ${
              req.app.locals.dict[res.locals.lang]
                .restore_password_please_click_on_link
            } 
            ${process.env.SERVER_URL}/restore_password?restore_id=${
      res.locals.restore_id
    }
            <br>
            ${
              req.app.locals.dict[res.locals.lang]
                .this_is_an_automatic_email_please_dont_answer
            }
            `;

    await send_email(recipient, title, html);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = send_restore_password_email;
