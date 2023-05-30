const get_cheeses = async function (req, res, next) {
  try {
    //console.log('get_cheeses')

    res.locals.cheeses = await req.app.models.cheese
      .find({ manufacturer: req.user.id })
      .sort({ createdAt: -1 });

    res.locals.unpaid_cheeses = (
      await req.app.models.unpaid_cheese
        .find({ "product.manufacturer": req.user.id })
        .sort({ "product.createdAt": -1 })
    ).map((unpaid_cheese) => unpaid_cheese.product);

    res.locals.unpaid_cheeses = res.locals.unpaid_cheeses.map(
      (unpaid_cheese) => {
        unpaid_cheese.unpaid = true;
        return unpaid_cheese;
      }
    );

    res.locals.cheeses.unshift(...res.locals.unpaid_cheeses);

    res.locals.cheeses = res.locals.cheeses.slice(
      (res.locals.page - 1) * 5,
      res.locals.page * 5
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_cheeses;
