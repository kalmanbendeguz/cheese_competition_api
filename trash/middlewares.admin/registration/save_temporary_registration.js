const save_temporary_registration = function () {
  const Admin_User_Model = require("../../models/Admin_User");
  const Admin_Temporary_Registration_Model = require("../../models/Admin_Temporary_Registration");

  return async function (req, res, next) {
    console.log("save_temporary_registration");

    const judge = new Admin_User_Model({
      email: req.body.email,
      hashed_password: res.locals.hashed_password,
      full_name: req.body.full_name,
    });

    await Admin_Temporary_Registration_Model.findOneAndUpdate(
      {
        "user.email": req.body.email,
      },
      { user: judge, confirm_string: res.locals.confirm_link_identifier },
      { upsert: true }
    );

    return next();
  };
};

module.exports = save_temporary_registration;
