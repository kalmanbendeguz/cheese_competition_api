module.exports = async function (req, res, next) {
  try {
    console.log("mw:update(product/one/put/mw/update)");

    for (const allowed_judge of res.locals.allowed_judges) {
      allowed_judge.set(res.locals.update);

      for (const key of res.locals.remove) {
        allowed_judge[key] = undefined;
      }
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
