module.exports = function (req, res, next) {
  try {
    console.log("mw:send(product/one/get/mw/send)");

    return res.status(200).json(res.locals.product);
  } catch (err) {
    return next(err);
  }
};
