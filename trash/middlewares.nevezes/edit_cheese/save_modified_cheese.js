const save_modified_cheese = async function (req, res, next) {
  try {
    //console.log('save_modified_cheese')

    await req.app.models.unpaid_cheese.updateOne(
      { "product.public_id": res.locals.cheese.public_id },
      {
        $set: {
          product: res.locals.cheese,
        },
      },
      { upsert: false }
    );

    return next();

    //return next()
  } catch (err) {
    return next(err);
  }
};

module.exports = save_modified_cheese;
