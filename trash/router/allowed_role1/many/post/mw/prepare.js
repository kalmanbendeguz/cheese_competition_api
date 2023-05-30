module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare(product/one/post/mw/prepare)");
    // GOAL: PRODUCE FILTER AND PROJECTION OBJECTS COMPLETELY.
    // NO ERRORS OR DENIALS SHOULD HAPPEN HERE
    // BUT CONDITIONAL LOGIC CAN TAKE PLACE

    res.locals._allowed_judges = req.body.map((allowed_judge) => ({
      email: allowed_judge.email,
    }));

    return next();
  } catch (err) {
    return next(err);
  }
};
