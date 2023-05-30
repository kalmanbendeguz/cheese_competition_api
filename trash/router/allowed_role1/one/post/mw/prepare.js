module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare(allowed_organizer/one/post/mw/prepare)");
    // GOAL: PRODUCE FILTER AND PROJECTION OBJECTS COMPLETELY.
    // NO ERRORS OR DENIALS SHOULD HAPPEN HERE
    // BUT CONDITIONAL LOGIC CAN TAKE PLACE

    res.locals._allowed_judge = {
      email: req.body.email,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};
