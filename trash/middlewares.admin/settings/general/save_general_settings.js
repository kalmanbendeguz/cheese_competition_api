const save_general_settings = function () {
  const Admin_User_Model = require("../../../models/Admin_User");

  return async function (req, res, next) {
    console.log("save_general_settings");

    await Admin_User_Model.findOneAndUpdate(
      {
        email: req.user.email,
      },
      {
        full_name: req.body.full_name,
      }
    );

    return next();
  };
};

module.exports = save_general_settings;
