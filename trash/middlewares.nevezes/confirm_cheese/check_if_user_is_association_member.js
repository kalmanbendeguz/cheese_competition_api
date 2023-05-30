const check_if_user_is_association_member = async function (req, res, next) {
  try {
    //console.log('check_if_user_is_association_member')
    console.log(res.locals.paid_competition);

    if (!req.user.association_member) return next();

    req.session.locals = res.locals;

    return res.redirect("/save_entry_certificate");
  } catch (err) {
    return next(err);
  }
};

module.exports = check_if_user_is_association_member;
