const get_language = function (req, res, next) {
  try {
    let language = req?.cookies?.language ?? req.app.locals.lang;

    const allowed_languages = Object.keys(req.app.locals.dict);

    if (!allowed_languages.includes(language)) language = req.app.locals.lang;

    res.locals.lang = language;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_language;
