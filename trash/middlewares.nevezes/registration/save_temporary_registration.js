const save_temporary_registration = async function (req, res, next) {
  try {
    //console.log('save_temporary_registration')

    const { password, confirm_password, ...registration } = req.body;
    registration.hashed_password = res.locals.hashed_password;

    const user = new req.app.models.user(registration);

    ///////////// TODO IDEIGLENES !!!!
    user.association_member = true;

    await req.app.models.temporary_registration.findOneAndUpdate(
      {
        "user.email": req.body.email,
      },
      { user: user, confirm_id: res.locals.confirm_id },
      { upsert: true }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_temporary_registration;
