const check_entry_opened = async function (req, res, next) {
  try {
    //console.log('check_entry_opened')

    const entry_opened = await req.app.models.key_value.findOne({
      key: "entry_opened",
    });

    if (!entry_opened)
      throw new Error(
        req.app.locals.dict[
          res.locals.lang
        ].entry_opened_document_does_not_exist
      );
    if (entry_opened.value) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].entry_is_not_opened_now
    );

    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_entry_opened;
