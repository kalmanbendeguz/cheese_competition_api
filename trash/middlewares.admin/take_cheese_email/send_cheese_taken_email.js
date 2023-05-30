const send_cheese_taken_email = function () {
  require("dotenv").config();
  let dictionary = require("../../static/dictionary");
  const send_email = require("../../services/send_email");
  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    console.log("send_cheese_taken_email");

    const competition_name = (
      await Key_Value_Model.findOne({ key: "competition_name" })
    ).value;
    const competition_location = (
      await Key_Value_Model.findOne({ key: "competition_location" })
    ).value;
    const now = new Date();
    const year = now.getFullYear();
    const month =
      now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
    const day = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;

    const recipient = res.locals.receipt_user.email;
    const title = `Sajtmustra átvételi elismervény: ${res.locals.cheese.public_id}`;
    const html = `
        <h4>${competition_name}</h4>
        <b>Átvételi elismervény</b><br><br>
        Tisztelt ${res.locals.receipt_user.full_name}!<br>
        A(z) "${res.locals.cheese.factory_name}" által készített<br>
        <b>${res.locals.cheese.public_id}</b> azonosítóval nyilvántartott<br>
        "${res.locals.cheese.product_name}" megnevezésű terméket<br>
        bírálatra átvettük.<br>
        <br>
        Üdvözlettel: Magyar Sajtkészítők Egyesülete<br>
        ${competition_location}, ${year}.${month}.${day}.
        `;

    await send_email(recipient, title, html);

    return next();
  };
};

module.exports = send_cheese_taken_email;
