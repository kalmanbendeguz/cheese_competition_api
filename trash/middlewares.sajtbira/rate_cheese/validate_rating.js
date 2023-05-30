const validate_rating = function (req, res, next) {
  try {
    console.log("validate_rating");

    console.log(req.body);
    console.log(req.files);
    // TODO

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validate_rating;
