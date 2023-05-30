const get_unpaid_cheese = function () {
  return async function (req, res, next) {
    console.log("get_unpaid_cheese");

    const Unpaid_Cheese_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "unpaid_cheeses"
      );

    res.locals.cheese = (
      await Unpaid_Cheese_Model.findOne({
        "product.public_id": req.query.public_id,
      })
    )?.product;

    if (res.locals.cheese) return next();

    req.app.push_cookie_array(
      req,
      res,
      "errors",
      "Ezzel az azonosítóval nem létezik fizetetlen termék."
    );

    return res.redirect("/authenticated_message");
  };
};

module.exports = get_unpaid_cheese;
