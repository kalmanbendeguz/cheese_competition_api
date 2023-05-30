const get_registered_cheese_numbers = function () {
  return async function (req, res, next) {
    //console.log('get_registered_cheese_numbers')

    const Cheese_Model =
      require("../../config/db").mongoose.connection.db.collection("cheeses");

    for (let user of res.locals.users) {
      user.registered_cheese_number = await Cheese_Model.countDocuments({
        manufacturer: user._id,
      });
    }

    return next();
  };
};

module.exports = get_registered_cheese_numbers;
