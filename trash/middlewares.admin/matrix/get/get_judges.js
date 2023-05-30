const get_judges = function () {
  return async function (req, res, next) {
    console.log("get_judges");

    const Judge_Model =
      require("../../../config/db").mongoose.connection.db.collection(
        "judge_users"
      );

    res.locals.judges = await Judge_Model.find().toArray();

    return next();
  };
};

module.exports = get_judges;
