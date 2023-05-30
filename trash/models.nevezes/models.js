let models = {};

models.active_password_reset = require("./Active_Password_Reset");
models.archived_cheese = require("./Archived_Cheese");
models.cheese = require("./Cheese");
models.entry_certificate = require("./Entry_Certificate");
models.entry_fee_payment = require("./Entry_Fee_Payment");
models.hand_in = require("./Hand_In");
models.key_value = require("./Key_Value");
models.pending_payment = require("./Pending_Payment");
models.rating = require("./Rating");
models.temporary_cheese = require("./Temporary_Cheese");
models.temporary_registration = require("./Temporary_Registration");
models.unpaid_cheese = require("./Unpaid_Cheese");
models.user = require("./User");

module.exports = models;
