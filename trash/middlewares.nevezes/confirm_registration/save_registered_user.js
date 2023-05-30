const save_registered_user = async function (req, res, next) {
  try {
    //console.log('save_registered_user')

    const user = new req.app.models.user(
      res.locals.temporary_registration.user.toObject()
    );

    await user.save();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_registered_user;
