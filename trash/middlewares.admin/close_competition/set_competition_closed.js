const set_competition_closed = function () {
  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    console.log("set_competition_closed");

    await Key_Value_Model.findOneAndUpdate(
      { key: "competition_opened" },
      { value: false },
      { upsert: true }
    );

    const now = new Date();

    await Key_Value_Model.findOneAndUpdate(
      { key: "competition_close_time" },
      { value: now },
      { upsert: true }
    );

    return next();
  };
};

module.exports = set_competition_closed;
