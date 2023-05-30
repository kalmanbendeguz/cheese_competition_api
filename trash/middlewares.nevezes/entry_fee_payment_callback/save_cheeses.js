const save_cheeses = async function (req, res, next) {
  try {
    //console.log('save_cheeses')

    res.locals.cheeses = await req.app.models.cheese.insertMany(
      res.locals.unpaid_cheeses.map((unpaid_cheese) => unpaid_cheese.product)
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_cheeses;
