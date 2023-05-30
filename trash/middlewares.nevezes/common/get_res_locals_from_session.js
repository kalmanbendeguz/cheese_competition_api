const get_res_locals_from_session = function (req, res, next) {
  try {
    //console.log('get_res_locals_from_session')

    res.locals = {
      ...res.locals,
      ...req.session.locals,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_res_locals_from_session;
