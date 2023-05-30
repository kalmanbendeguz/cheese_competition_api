const set_entry_closed = function () {
  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    console.log("set_entry_closed");

    await Key_Value_Model.findOneAndUpdate(
      { key: "entry_opened" },
      { value: false },
      { upsert: true }
    );

    const now = new Date();

    await Key_Value_Model.findOneAndUpdate(
      { key: "entry_close_time" },
      { value: now },
      { upsert: true }
    );

    return next();
  };
};

module.exports = set_entry_closed;
