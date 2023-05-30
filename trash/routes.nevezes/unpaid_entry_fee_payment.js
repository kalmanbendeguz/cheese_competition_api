const express = require("express");
const router = express.Router();

const check_authenticated = require("../middlewares/common/check_authenticated");
const check_entry_opened = require("../middlewares/common/check_entry_opened");
const get_session_context = require("../middlewares/common/get_session_context");

const create_pending_payment = require("../middlewares/unpaid_entry_fee_payment/create_pending_payment");
const format_billing_information = require("../middlewares/unpaid_entry_fee_payment/format_billing_information");
const get_payment_config = require("../middlewares/unpaid_entry_fee_payment/get_payment_config");
const get_unpaid_cheeses = require("../middlewares/unpaid_entry_fee_payment/get_unpaid_cheeses");
const start_barion_payment = require("../middlewares/unpaid_entry_fee_payment/start_barion_payment");

router.get(
  "/",
  check_authenticated,
  get_session_context,
  check_entry_opened,
  get_unpaid_cheeses,
  get_payment_config,
  create_pending_payment,
  format_billing_information,
  start_barion_payment
);

module.exports = router;
