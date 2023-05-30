const db = require("../config/db").mongoose;
const Cheese_Model = require("./Cheese").schema;

const Unpaid_Cheese = db.model("Unpaid_Cheese", {
  confirm_payment_id: String,
  product: Cheese_Model,
});

module.exports = Unpaid_Cheese;
