const save_set_password = async function (req, res, next) {
  try {
    //console.log('save_set_password')

    await req.app.models.user.updateOne(
      { email: req.user.email },
      { $set: { hashed_password: res.locals.hashed_password } },
      { upsert: false }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_set_password;
