module.exports = async function (req, res, next) {
  try {
    console.log("mw:authorize(product/one/put/mw/authorize)");

    // a judge can not update any product
    if (req.user.role === "judge") {
      return res.sendStatus(403);
    }

    // a competitor can update their products.
    if (req.user.role === "competitor") {
      return res.sendStatus(403);
    }

    // an organizer can update any products
    if (req.user.role === "organizer") {
      const required_query = [];
      const forbidden_query = [];
      const required_update = [];
      const forbidden_update = [];

      if (required_query.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_query.some((key) => key in req.query))
        return res.sendStatus(403);
      if (required_update.some((key) => !(key in req.body)))
        return res.sendStatus(403);
      if (forbidden_update.some((key) => key in req.body))
        return res.sendStatus(403);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
