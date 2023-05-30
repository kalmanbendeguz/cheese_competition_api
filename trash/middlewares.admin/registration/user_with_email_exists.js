const user_with_email_exists = function () {
  const Admin_User_Model = require("../../models/Admin_User");

  return async function (req, res, next) {
    console.log("user_with_email_exists");

    const judge = await Admin_User_Model.findOne({ email: req.body.email });

    if (!judge) return next();

    res.locals.registration = req.body;
    (res.locals.errors ||= []).push("Ezzel az email címmel már létezik bíra!");

    return res.render("registration");
  };
};

module.exports = user_with_email_exists;
