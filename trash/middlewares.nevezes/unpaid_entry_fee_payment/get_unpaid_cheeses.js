const get_unpaid_cheeses = async function (req, res, next) {
  try {
    //console.log('get_unpaid_cheeses')

    res.locals.unpaid_cheeses = await req.app.models.unpaid_cheese.find({
      "product.manufacturer": req.user.id,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_unpaid_cheeses;
