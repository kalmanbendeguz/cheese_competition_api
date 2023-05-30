const get_entry_fee_payments = async function (req, res, next) {
  try {
    //console.log('get_entry_fee_payments')

    for (let cheese of res.locals.cheeses) {
      cheese.entry_fee_paid = await req.app.models.entry_fee_payment.exists({
        cheese_ids: { $elemMatch: { $eq: cheese._id } },
      });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_entry_fee_payments;
