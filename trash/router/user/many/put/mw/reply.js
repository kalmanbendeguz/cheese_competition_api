module.exports = function (req, res, next) {
  try {
    console.log("mw:reply(product/many/put/mw/reply)");

    // there is NOTHING EXCLUSIVELY COMMON about the posted products, so we cannot set res.location
    // e.g. their manufacturer might be the same, but there might be another, previous products of the same manufacturer.

    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};
