const check_email_registered = function () {
  const Admin_User_Model = require("../../models/Admin_User");

  return async function (req, res, next) {
    console.log("check_email_registered");

    res.locals.user = await Admin_User_Model.findOne({ email: req.body.email });

    if (res.locals.user) return next();
    (res.locals.errors ||= []).push(
      "Ez az e-mail nincs regisztrálva a rendszerben!"
    );
    return res.render("login", { email: req.body.email });
  };
};

module.exports = check_email_registered;
