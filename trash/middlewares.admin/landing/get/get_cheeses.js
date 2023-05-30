const get_cheeses = function () {
  return async function (req, res, next) {
    console.log("get_cheeses");

    const Cheese_Model =
      require("../../../config/db").mongoose.connection.db.collection(
        "cheeses"
      );

    res.locals.cheeses = await Cheese_Model.find().toArray();

    return next();
  };
};

module.exports = get_cheeses;
