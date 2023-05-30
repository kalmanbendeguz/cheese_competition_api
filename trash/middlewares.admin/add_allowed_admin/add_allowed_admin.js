const add_allowed_admin = function () {
  const Allowed_Admin_Model = require("../../models/Allowed_Admin");

  return async function (req, res, next) {
    console.log("add_allowed_admin");

    await Allowed_Admin_Model.updateOne(
      { email: req.body.new_allowed_admin_email },
      { $set: { email: req.body.new_allowed_admin_email } },
      { upsert: true }
    );

    return next();
  };
};

module.exports = add_allowed_admin;
