const check_temporary_rating_belongs_to_judge_modify_rating = function (
  req,
  res,
  next
) {
  try {
    //console.log('check_temporary_rating_belongs_to_judge_modify_rating')

    if (res.locals.temporary_rating.rating.judge_email === req.user.email)
      return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang]
        .temporary_rating_does_not_belong_to_user
    );

    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_temporary_rating_belongs_to_judge_modify_rating;
