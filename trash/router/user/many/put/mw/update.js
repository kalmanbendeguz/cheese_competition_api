module.exports = async function (req, res, next) {
  try {
    console.log("mw:update(product/one/put/mw/update)");

    for (const product of res.locals.products) {
      product.set(res.locals.update);

      for (const key of res.locals.remove) {
        product[key] = undefined;
      }
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
