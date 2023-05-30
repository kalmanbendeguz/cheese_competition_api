const get_admins = function () {
  const Admin_User_Model = require("../../models/Admin_User");

  return async function (req, res, next) {
    console.log("get_admins");

    res.locals.admins = await Admin_User_Model.find();

    return next();
  };
};

module.exports = get_admins;
