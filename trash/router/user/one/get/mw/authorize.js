module.exports = async function (req, res, next) {
  try {
    console.log("mw:authorize");

    // id
    // manufacturer_id
    // public_id
    // secret_id
    // fields

    // REQUIRED FIELDS
    // FORBIDDEN FIELDS
    // FORBIDDEN PROJECTIONS

    // success if user is authorized to do this action
    // fail if unauthorized

    // BASED ON ONLY THE (QUERY / BODY) AND THE USER ROLE,
    // IS THERE ANYTHING ILLEGAL?
    if (req.user.role === "competitor") {
      const required_query = ["public_id"];
      const forbidden_query = ["_id", "secret_id"];
      res.locals.forbidden_projections = ["_id", "secret_id"];

      if (required_query.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_query.some((key) => key in req.query))
        return res.sendStatus(403);
      if (
        res.locals.forbidden_projections.some(
          (key) => key in (req.query.projection ?? {})
        )
      )
        return res.sendStatus(403);
    }

    if (req.user.role === "judge") {
      const required_query = ["secret_id"];
      const forbidden_query = ["_id", "public_id"];
      res.locals.forbidden_projections = [
        "_id",
        "manufacturer_id",
        "public_id",
        "product_name",
        "factory_name",
        "product_description",
      ];

      if (required_query.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_query.some((key) => key in req.query))
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
      const required_query = [];
      const forbidden_query = [];
      res.locals.forbidden_projections = [];

      if (required_query.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_query.some((key) => key in req.query))
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
