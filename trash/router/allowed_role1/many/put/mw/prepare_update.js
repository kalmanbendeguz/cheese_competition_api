module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare_update(product/many/put/mw/prepare_update)");

    res.locals.update = {
      ...(req.body.email && { email: req.body.email }), // should check if exists and opened
    };

    res.locals.remove = [];

    return next();
  } catch (err) {
    return next(err);
  }
};
