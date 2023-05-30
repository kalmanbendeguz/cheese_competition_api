const save_restored_password = async function (req, res, next) {
  try {
    //console.log('save_restored_password')

    await req.app.models.user.updateOne(
      { email: res.locals.user.email },
      {
        $set: {
          hashed_password: res.locals.hashed_password,
        },
      },
      { upsert: true }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_restored_password;
