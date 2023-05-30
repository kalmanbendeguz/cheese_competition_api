module.exports = async function (req, res, next) {
  try {
    console.log("mw:authorize(product/one/del/mw/authorize)");

    // id
    // manufacturer_id
    // public_id
    // secret_id

    // REQUIRED FIELDS
    // FORBIDDEN FIELDS
    // FORBIDDEN PROJECTIONS

    // success if user is authorized to do this action
    // fail if unauthorized

    // BASED ON ONLY THE (QUERY / BODY) AND THE USER ROLE,
    // IS THERE ANYTHING ILLEGAL?

    // a judge cannot remove any products
    if (req.user.role === "judge") {
      return res.sendStatus(403);
    }

    if (req.user.role === "competitor") {
      return res.sendStatus(403);
    }

    // an organizer can query by any field
    if (req.user.role === "organizer") {
      const required_query = [];
      const forbidden_query = [];

      if (required_query.some((key) => !(key in req.query)))
        return res.sendStatus(403);
      if (forbidden_query.some((key) => key in req.query))
        return res.sendStatus(403);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
