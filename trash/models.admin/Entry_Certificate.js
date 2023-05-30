const db = require("../config/db").mongoose;
const { Schema } = require("mongoose");

const Entry_Certificate_Schema = new Schema(
  {
    user_id: Schema.Types.ObjectId,
    product_id: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Entry_Certificate = db.model(
  "Entry_Certificate",
  Entry_Certificate_Schema
);

module.exports = Entry_Certificate;
module.exports.schema = Entry_Certificate_Schema;
