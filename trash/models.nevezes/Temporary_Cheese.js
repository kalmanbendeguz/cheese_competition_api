const db = require("../config/db").mongoose;
const Cheese_Model = require("./Cheese").schema;

const Temporary_Cheese = db.model("Temporary_Cheese", {
  confirm_id: String,
  cheese: Cheese_Model,
  expiring_started: {
    type: Date,
    default: Date.now,
    expires: 36 * 60 * 60,
  },
});

module.exports = Temporary_Cheese;
