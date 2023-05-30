const db = require("../config/db").mongoose;

const Allowed_Admin = db.model("Allowed_Admin", {
  email: String,
});

module.exports = Allowed_Admin;
