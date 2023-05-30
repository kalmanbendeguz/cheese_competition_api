const get_general_settings = function () {
  const Admin_User_Model = require("../../../models/Admin_User");

  return async function (req, res, next) {
    console.log("get_general_settings");

    res.locals.general_settings = await Admin_User_Model.findOne(
      {
        email: req.user.email,
      },
      `
            full_name
            `
    );

    return next();
  };
};

module.exports = get_general_settings;
