const db = require("../config/db").mongoose;

const Hand_In_Schema = require("./Hand_In").schema;

const Archived_Hand_In = db.model("Archived_Hand_In", Hand_In_Schema);

module.exports = Archived_Hand_In;
