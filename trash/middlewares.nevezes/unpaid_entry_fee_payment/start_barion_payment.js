const start_barion_payment = async function (req, res, next) {
  try {
    //console.log('start_barion_payment')

    const barion = require("../../config/barion");
    const Fraction = require("fraction.js");

    const total_price = Fraction(res.locals.unpaid_cheeses.length)
      .mul(res.locals.entry_fee_amount)
      .toString();

    const entry_fee_payment = {
      PaymentType: "Immediate",
      PaymentWindow: "0:00:30:00",
      PaymentRequestId: res.locals.pending_payment.pos_transaction_id,
      PayerHint: req.user.email,
      RedirectUrl: `${process.env.SERVER_URL}/entry_fee_payment_redirect`,
      CallbackUrl: `${process.env.SERVER_URL}/entry_fee_payment_callback`,
      Currency: res.locals.entry_fee_currency,
      ChallengePreference: "NoPreference",
      BillingAddress: {
        Country: "HU",
        City: req.user.billing_city,
        Region: res.locals.billing_region_iso_3166_2,
        Zip: req.user.billing_zip,
        Street: res.locals.street,
        Street2: res.locals.street2,
        Street3: res.locals.street3,
      },

      Transactions: [
        {
          POSTransactionId: res.locals.pending_payment.pos_transaction_id,
          Payee: process.env.BARION_PAYEE,
          Total: total_price,
          Items: [
            {
              Name: req.app.locals.dict[res.locals.lang].entry_fee_item_name,
              Description:
                req.app.locals.dict[res.locals.lang].entry_fee_item_description,
              Quantity: res.locals.unpaid_cheeses.length,
              Unit: req.app.locals.dict[res.locals.lang].entry_fee_item_unit,
              UnitPrice: res.locals.entry_fee_amount,
              ItemTotal:
                res.locals.unpaid_cheeses.length * res.locals.entry_fee_amount,
            },
          ],
        },
      ],
    };

    const start_payment = async () =>
      barion.startPayment(entry_fee_payment, (err, result) => {
        return { err, result };
      });
    const returned = await start_payment();

    //console.log('ERR')
    //console.log(returned.err)
    //console.log('RESULT')
    //console.log(returned.result)
    return res.redirect(returned.result.GatewayUrl);
  } catch (err) {
    return next(err);
  }
};

module.exports = start_barion_payment;
