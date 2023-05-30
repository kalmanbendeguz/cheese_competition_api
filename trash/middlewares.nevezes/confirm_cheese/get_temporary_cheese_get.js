const get_temporary_cheese_get = async function (req, res, next) {
  try {
    //console.log('get_temporary_cheese')

    res.locals.temporary_cheese = await req.app.models.temporary_cheese
      .findOne({ confirm_id: req.query.confirm_id })
      .lean();

    if (res.locals.temporary_cheese) {
      res.locals.cheese = res.locals.temporary_cheese.cheese;
      return next();
    }

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].temporary_cheese_does_not_exist
    );
    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = get_temporary_cheese_get;
