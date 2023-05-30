const get_rating = async function (req, res, next) {
  try {
    //console.log('get_rating')

    res.locals.rating = await req.app.models.rating.findOne({
      secret_id: req.query.secret_id,
      judge_email: req.user.email,
    });

    if (res.locals.rating) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].rating_does_not_exist
    );

    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = get_rating;
