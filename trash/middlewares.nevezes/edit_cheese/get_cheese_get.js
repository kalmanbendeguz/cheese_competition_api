const get_cheese_get = async function (req, res, next) {
  try {
    //console.log('get_cheese')

    res.locals.cheese = (
      await req.app.models.unpaid_cheese.findOne({
        "product.public_id": req.query.public_id,
      })
    )?.product;

    if (res.locals.cheese) return next();

    req.app.set_session_context(
      req.session,
      "errors",
      req.app.locals.dict[res.locals.lang].no_cheese_with_this_id_exists
    );

    return res.redirect("/message_authenticated");
  } catch (err) {
    return next(err);
  }
};

module.exports = get_cheese_get;
