const get_unpaid_cheeses = function () {
  return async function (req, res, next) {
    console.log("get_unpaid_cheeses");

    const Unpaid_Cheese_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "unpaid_cheeses"
      );

    const unpaid_cheeses = await Unpaid_Cheese_Model.find().toArray();

    res.locals.cheeses = unpaid_cheeses.map(
      (unpaid_cheese) => unpaid_cheese.product
    );

    return next();
  };
};

module.exports = get_unpaid_cheeses;
