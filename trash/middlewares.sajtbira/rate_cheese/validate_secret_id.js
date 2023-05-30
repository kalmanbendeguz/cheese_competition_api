const validate_secret_id = function (req, res, next) {
  try {
    //console.log('validate_secret_id')

    // TODO

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validate_secret_id;
