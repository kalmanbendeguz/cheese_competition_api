const save_set_password = function () {
  const Admin_User_Model = require("../../../models/Admin_User");

  return async function (req, res, next) {
    console.log("save_set_password");

    await Admin_User_Model.findOneAndUpdate(
      {
        email: res.locals.user.email,
      },
      {
        hashed_password: res.locals.hashed_password,
      },
      { upsert: true }
    );

    return next();
  };
};

module.exports = save_set_password;
