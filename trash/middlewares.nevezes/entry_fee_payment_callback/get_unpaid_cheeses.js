const get_unpaid_cheeses = async function (req, res, next) {
  try {
    //console.log('get_unpaid_cheeses')

    res.locals.unpaid_cheeses = await req.app.models.unpaid_cheese.find({
      confirm_payment_id: {
        $in: res.locals.pending_payment.confirm_payment_ids,
      },
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_unpaid_cheeses;
