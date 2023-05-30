const get_allowed_judges = function () {
  return async function (req, res, next) {
    console.log("get_allowed_judges");

    const Allowed_Judge_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "allowed_judges"
      );

    res.locals.allowed_judges = await Allowed_Judge_Model.find().toArray();

    return next();
  };
};

module.exports = get_allowed_judges;
