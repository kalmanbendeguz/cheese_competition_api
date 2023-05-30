const db = require("../config/db").mongoose;

const Entry_Fee_Payment_Schema = require("./Entry_Fee_Payment").schema;

const Archived_Entry_Fee_Payment = db.model(
  "Archived_Entry_Fee_Payment",
  Entry_Fee_Payment_Schema
);

module.exports = Archived_Entry_Fee_Payment;
