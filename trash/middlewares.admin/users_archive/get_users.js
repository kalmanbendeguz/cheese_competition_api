const get_users = function () {
  return async function (req, res, next) {
    //console.log('get_users')

    const User_Model =
      require("../../config/db").mongoose.connection.db.collection("users");

    res.locals.users = await User_Model.find().toArray();

    return next();
  };
};

module.exports = get_users;
