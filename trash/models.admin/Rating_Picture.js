const db = require("../config/db").mongoose;
const { Schema } = require("mongoose");

const Rating_Picture_Schema = new Schema(
  {
    rating_id: Schema.Types.ObjectId,
    pictures: [Schema.Types.Mixed],
  },
  { timestamps: true }
);

const Rating_Picture = db.model("Rating_Picture", Rating_Picture_Schema);

module.exports = Rating_Picture;
module.exports.schema = Rating_Picture_Schema;
