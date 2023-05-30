const save_password_reset = async function (req, res, next) {
  try {
    //console.log('save_password_reset')

    await req.app.models.active_password_reset.updateOne(
      { email: req.body.email },
      {
        $set: {
          email: req.body.email,
          restore_id: res.locals.restore_id,
          expiring_started: new Date(),
        },
      },
      { upsert: true }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_password_reset;
