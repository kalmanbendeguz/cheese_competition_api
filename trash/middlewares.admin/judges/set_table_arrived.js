const set_table_arrived = function () {
  return async function (req, res, next) {
    console.log("set_table_arrived");

    const Judge_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "judge_users"
      );

    const all_judges = await Judge_Model.find().toArray();

    console.log(all_judges);

    for (let judge of all_judges) {
      await Judge_Model.findOneAndUpdate(
        { email: judge.email },
        {
          $set: {
            table_arrived: res.locals.table_arrived.includes(judge.email)
              ? true
              : false,
          },
        },
        { upsert: false }
      );
    }

    const modified_judges = await Judge_Model.find().toArray();

    console.log(modified_judges);

    return next();
  };
};

module.exports = set_table_arrived;
