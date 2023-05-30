module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare_get(product/one/put/mw/prepare_get)");

    // GOAL: PRODUCE FILTER OBJECT COMPLETELY. NO ERRORS OR DENIALS SHOULD HAPPEN HERE
    // BUT CONDITIONAL LOGIC CAN TAKE PLACE

    // id
    // manufacturer_id
    // public_id
    // secret_id

    const manufacturer_id =
      req.user.role === "competitor" ? req.user._id : undefined;

    res.locals.filter = {
      ...(req.query._id && { _id: req.query._id }),
      ...(manufacturer_id && { manufacturer_id: manufacturer_id }),
      ...(req.query.public_id && { public_id: req.query.public_id }),
      ...(req.query.secret_id && { secret_id: req.query.secret_id }),
    };

    return next();
  } catch (err) {
    return next(err);
  }
};
