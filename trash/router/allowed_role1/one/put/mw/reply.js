module.exports = function (req, res, next) {
  try {
    console.log("mw:reply(product/one/put/mw/reply)");

    res.location(`/api/a/allowed_judge/o?_id=${res.locals.allowed_judge._id}`);

    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};
