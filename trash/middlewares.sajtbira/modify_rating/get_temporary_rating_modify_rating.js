const get_temporary_rating_modify_rating = async function (req, res, next) {
  try {
    //console.log('get_temporary_rating_modify_rating')

    res.locals.temporary_rating = await req.app.models.temporary_rating.findOne(
      { confirm_id: req.query.confirm_id }
    );

    if (res.locals.temporary_rating) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].temporary_rating_does_not_exist
    );

    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = get_temporary_rating_modify_rating;
