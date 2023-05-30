const db = require("../config/db").mongoose;
const { Schema } = require("mongoose");

const Pending_Payment_Schema = new Schema(
  {
    pos_transaction_id: String,
    confirm_payment_ids: [String],
  },
  { timestamps: true }
);

const Pending_Payment = db.model("Pending_Payment", Pending_Payment_Schema);

module.exports = Pending_Payment;
