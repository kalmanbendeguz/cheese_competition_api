const check_payment_succeeded = async function (req, res, next) {
  try {
    //console.log('check_payment_succeeded')
    const barion = require("../../config/barion");

    const get_payment_state = async () =>
      barion.getPaymentState({ PaymentId: req.body.PaymentId }, (err, data) => {
        return { err, data };
      });
    const state = await get_payment_state();

    if (state?.err) throw new Error(state.err);
    if (!state?.data)
      throw new Error(
        req.app.locals.dict[
          res.locals.lang
        ].barion_error_getpaymentstate_returned_no_data
      );

    res.locals.payment = state.data;

    if (state.data.Status === "Succeeded") return next();

    if (state.data.Status === "Canceled" || state.data.Status === "Expired") {
      let pending_payment = null;
      for (let transaction of res.locals.payment.Transactions) {
        pending_payment = await req.app.models.pending_payment.findOne({
          pos_transaction_id: transaction.POSTransactionId,
        });
        if (pending_payment) break;
      }
      if (!pending_payment) return res.sendStatus(200);
      await req.app.models.pending_payment.findByIdAndDelete(
        pending_payment._id
      );
    }

    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

module.exports = check_payment_succeeded;
