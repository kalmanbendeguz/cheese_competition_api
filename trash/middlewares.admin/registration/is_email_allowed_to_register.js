const is_email_allowed_to_register = function () {
  const Allowed_Admin_Model = require("../../models/Allowed_Admin");

  return async function (req, res, next) {
    console.log("is_email_allowed_to_register");

    const allowed = await Allowed_Admin_Model.findOne({
      email: req.body.email,
    });

    if (allowed) return next();

    res.locals.registration = req.body;
    (res.locals.errors ||= []).push(
      "Ez az email cím nem szerepel a regisztrálható bírák között!"
    );

    return res.render("registration");
  };
};

module.exports = is_email_allowed_to_register;
