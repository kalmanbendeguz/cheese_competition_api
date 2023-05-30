const add_allowed_judge = function () {
  return async function (req, res, next) {
    console.log("add_allowed_judge");

    const Allowed_Judge_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "allowed_judges"
      );

    await Allowed_Judge_Model.updateOne(
      { email: req.body.new_allowed_judge_email },
      { $set: { email: req.body.new_allowed_judge_email } },
      { upsert: true }
    );

    return next();
  };
};

module.exports = add_allowed_judge;
