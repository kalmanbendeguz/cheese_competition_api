module.exports = async function (req, res, next) {
  try {
    console.log("mw:remove(product/one/del/mw/remove)");

    await res.locals.allowed_judge.deleteOne();

    return next();
  } catch (err) {
    return next(err);
  }
};
