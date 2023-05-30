const db = require("../config/db").mongoose;
const { Schema } = require("mongoose");

const Temporary_Rating_Picture_Schema = new Schema({
  confirm_id: String,
  pictures: [Schema.Types.Mixed],
  expiring_started: {
    type: Date,
    default: Date.now,
    expires: 36 * 60 * 60,
  },
});

const Temporary_Rating_Picture = db.model(
  "Temporary_Rating_Picture",
  Temporary_Rating_Picture_Schema
);

module.exports = Temporary_Rating_Picture;
module.exports.schema = Temporary_Rating_Picture_Schema;
