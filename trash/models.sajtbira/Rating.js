const db = require("../config/db").mongoose;
const { Schema } = require("mongoose");

const Rating_Schema = new Schema(
  {
    secret_id: String,
    judge_email: String,
    anonymous: Boolean,
    aspects: Schema.Types.Mixed,
    overall_impression: String,
    table_leader: Boolean,
  },
  { timestamps: true }
);

const Rating = db.model("Rating", Rating_Schema);

module.exports = Rating;
module.exports.schema = Rating_Schema;
