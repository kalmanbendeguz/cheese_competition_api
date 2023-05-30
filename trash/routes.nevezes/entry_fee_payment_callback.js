const express = require("express");
const router = express.Router();

const check_payment_succeeded = require("../middlewares/entry_fee_payment_callback/check_payment_succeeded");
const get_transaction = require("../middlewares/entry_fee_payment_callback/get_transaction");
const get_unpaid_cheeses = require("../middlewares/entry_fee_payment_callback/get_unpaid_cheeses");
const remove_pending_payment = require("../middlewares/entry_fee_payment_callback/remove_pending_payment");
const remove_unpaid_cheeses = require("../middlewares/entry_fee_payment_callback/remove_unpaid_cheeses");
const save_cheeses = require("../middlewares/entry_fee_payment_callback/save_cheeses");
const save_payment = require("../middlewares/entry_fee_payment_callback/save_payment");
const send_status_200 = require("../middlewares/entry_fee_payment_callback/send_status_200");

router.post(
  "/",
  check_payment_succeeded,
  get_transaction,
  get_unpaid_cheeses,
  save_cheeses,
  remove_unpaid_cheeses,
  save_payment,
  remove_pending_payment,
  send_status_200
);

module.exports = router;
