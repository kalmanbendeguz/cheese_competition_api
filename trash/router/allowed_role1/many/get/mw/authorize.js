module.exports = function (req, res, next) {
  try {
    console.log("mw:authorize(product/many/get/mw/authorize)");

    // success if user is authorized to do this action
    // fail if unauthorized

    // a competitor can query anything if the manufacturer_id belongs to them
    // or if a manufacturer_id wasnt provided, then the competitor is still authorized

    // REQUIRED FIELDS
    // FORBIDDEN FIELDS
    // FORBIDDEN PROJECTIONS

    if (req.user.role === "competitor") {
      const required_fields = [];
      const forbidden_fields = [];
      res.locals.forbidden_projections = [];

      if (required_fields.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_fields.some((key) => key in req.query))
        return res.sendStatus(403);
      if (
        res.locals.forbidden_projections.some(
          (key) => key in (req.query.projection ?? {})
        )
      )
        return res.sendStatus(403);
    }

    // a judge can query nothing
    if (req.user.role === "judge") {
      const required_fields = [];
      const forbidden_fields = [];
      res.locals.forbidden_projections = [];

      if (required_fields.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_fields.some((key) => key in req.query))
        return res.sendStatus(403);
      if (
        res.locals.forbidden_projections.some(
          (key) => key in (req.query.projection ?? {})
        )
      )
        return res.sendStatus(403);
    }

    // an organizer can query anything
    if (req.user.role === "organizer") {
      const required_fields = [];
      const forbidden_fields = [];
      res.locals.forbidden_projections = [];

      if (required_fields.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_fields.some((key) => key in req.query))
        return res.sendStatus(403);
      if (
        res.locals.forbidden_projections.some(
          (key) => key in (req.query.projection ?? {})
        )
      )
        return res.sendStatus(403);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
