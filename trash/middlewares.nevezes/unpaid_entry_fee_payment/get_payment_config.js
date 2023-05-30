const get_payment_config = async function (req, res, next) {
  try {
    //console.log('get_payment_config')

    res.locals.entry_fee_amount = (
      await req.app.models.key_value.findOne({ key: "entry_fee_amount" })
    )?.value;
    res.locals.entry_fee_currency = (
      await req.app.models.key_value.findOne({ key: "entry_fee_currency" })
    )?.value;
    //res.locals.paid_competition = (await req.app.models.key_value.findOne({ key: 'paid_competition' }))?.value

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_payment_config;
