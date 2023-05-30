const redirect_to_referrer = function (req, res, next) {
  try {
    //console.log('redirect_to_referrer')

    return res.redirect(req?.headers?.referer ?? "/");
  } catch (err) {
    return next(err);
  }
};

module.exports = redirect_to_referrer;
