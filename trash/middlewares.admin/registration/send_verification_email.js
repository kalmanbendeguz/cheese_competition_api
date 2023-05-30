const send_verification_email = function () {
  require("dotenv").config();
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");
  const email_config = require("../../config/email_config");
  const OAuth2 = google.auth.OAuth2;

  return async function (req, res, next) {
    console.log("send_verification_email");

    const oauth2_client = new OAuth2(
      email_config.client_id,
      email_config.client_secret
    );
    oauth2_client.setCredentials({ refresh_token: email_config.refresh_token });
    const accessToken = await oauth2_client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: email_config.user,
        clientId: email_config.client_id,
        clientSecret: email_config.client_secret,
        refreshToken: email_config.refresh_token,
        accessToken: accessToken,
      },
    });

    const options = {
      from: "Sajtkészítők Egyesülete <sajtkeszitokegyesulete@gmail.com>",
      to: req.body.email,
      subject: "Sajtverseny regisztráció megerősítése",
      text: `Bíra regisztráció megerősítéséhez kérlek kattints a linkre: ${process.env.SERVER_URL}/confirm_registration?confirm_id=${res.locals.confirm_link_identifier}
\r\nEz egy automatikusan generált email, kérlek ne válaszolj rá!`,
    };

    await transporter.sendMail(options);

    return next();
  };
};

module.exports = send_verification_email;
