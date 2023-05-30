const get_archived_cheese = function () {
  const Archived_Cheese_Model = require("../../models/Archived_Cheese");

  return async function (req, res, next) {
    console.log("get_archived_cheese");

    res.locals.cheese = await Archived_Cheese_Model.findOne({
      public_id: req.query.public_id,
    });

    if (res.locals.cheese) return next();

    req.app.push_cookie_array(
      req,
      res,
      "errors",
      "Ezzel az azonosítóval nem létezik archivált termék."
    );

    return res.redirect("/authenticated_message");
  };
};

module.exports = get_archived_cheese;
