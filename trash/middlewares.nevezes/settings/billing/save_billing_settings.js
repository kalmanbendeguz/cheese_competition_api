const save_billing_settings = async function (req, res, next) {
  try {
    //console.log('save_billing_settings')

    await req.app.models.user.updateOne(
      { email: req.user.email },
      { $set: req.body }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_billing_settings;
