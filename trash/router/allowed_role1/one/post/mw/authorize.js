module.exports = async function (req, res, next) {
  try {
    console.log("mw:authorize(allowed_organizer/one/post/mw/authorize)");
    // BASED ON THE USER ROLE
    // CONSIDERING ONLY THE REQUEST OBJECT,
    // IS THERE ANYTHING ILLEGAL?
    // (NO DB QUERY!)

    // incluseive or exclusive?
    //first exclusive, then inclusive

    // since only competitors are allowed to use this endpoint, there are no additional
    // authorization rules, by design.

    // only organizer
    if (req.user.role !== "organizer") {
      return res.sendStatus(403);
    }

    // only organizer
    if (req.user.role === "judge") {
      return res.sendStatus(403);
    }
    // only organizer
    if (req.user.role === "competitor") {
      return res.sendStatus(403);
    }

    if (req.user.role === "organizer") {
    }

    // an organizer can not post any product

    // only organizer

    return next();
  } catch (err) {
    return next(err);
  }
};
