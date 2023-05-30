module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare_update(product/one/put/mw/prepare_update)");

    res.locals.update = {
      ...(req.body.email && { email: req.body.email }),
    };

    res.locals.remove = [];

    return next();
  } catch (err) {
    return next(err);
  }
};
