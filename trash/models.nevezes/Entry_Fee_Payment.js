const db = require("../config/db").mongoose;
const { Schema } = require("mongoose");

const Entry_Fee_Payment_Schema = new Schema(
  {
    cheese_ids: [Schema.Types.ObjectId],
    barion_payment_id: String,
    barion_transaction_id: String,
    amount: Number,
    currency: String,
  },
  { timestamps: true }
);

const Entry_Fee_Payment = db.model(
  "Entry_Fee_Payment",
  Entry_Fee_Payment_Schema
);

module.exports = Entry_Fee_Payment;
