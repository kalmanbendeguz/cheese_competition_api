const db = require("../config/db").mongoose;

const Judge_Active_Password_Reset = db.model("Judge_Active_Password_Reset", {
  restore_id: String,
  email: String,
  expiring_started: {
    type: Date,
    default: Date.now,
    expires: 15 * 60,
  },
});

module.exports = Judge_Active_Password_Reset;
