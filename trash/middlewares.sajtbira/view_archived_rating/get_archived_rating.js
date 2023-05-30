const get_archived_rating = async function (req, res, next) {
  try {
    //console.log('get_archived_rating')

    res.locals.rating = await req.app.models.archived_rating.findOne({
      secret_id: req.query.secret_id,
      judge_email: req.user.email,
    });

    res.locals.rating_archived = true;

    if (res.locals.rating) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].archived_rating_does_not_exist
    );

    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = get_archived_rating;
