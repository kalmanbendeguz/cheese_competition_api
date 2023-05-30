const get_users_of_cheeses = function () {
  return async function (req, res, next) {
    console.log("get_users_of_cheeses");

    const User_Model =
      require("../../config/db").mongoose.connection.db.collection("users");

    for (let cheese of res.locals.cheeses) {
      let user_of_cheese = await User_Model.findOne({
        _id: cheese.manufacturer,
      });
      cheese.user = user_of_cheese;
    }

    return next();
  };
};

module.exports = get_users_of_cheeses;
