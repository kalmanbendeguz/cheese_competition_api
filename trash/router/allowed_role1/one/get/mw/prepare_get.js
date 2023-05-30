module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare_get(product/one/get/mw/prepare_get)");

    // GOAL: PRODUCE FILTER AND PROJECTION OBJECTS COMPLETELY. NO ERRORS OR DENIALS SHOULD HAPPEN HERE
    // BUT CONDITIONAL LOGIC CAN TAKE PLACE

    // id
    // manufacturer_id
    // public_id
    // secret_id
    // projection

    // if you're not an organizer, you can only query your email.
    const email =
      req.user.role === "organizer" ? req.query.email : req.user.email;

    res.locals.filter = {
      ...(req.query._id && { _id: req.query._id }),
      ...(email && { email: email }),
    };

    res.locals.projection = req.query.projection ?? {};
    for (const key of res.locals.forbidden_projections) {
      res.locals.projection[key] = 0;
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
