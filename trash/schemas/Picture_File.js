const { Schema } = require("mongoose");

const File_Schema = new Schema(
  {
    file_name: {
      type: String,
    },
    encoding: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    buffer: {
      type: Buffer,
    },
    size: {
      type: Number,
    },
  },
  {
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true,
  }
);

module.exports = Picture_File_Schema;
