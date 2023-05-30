const get_general_settings = async function (req, res, next) {
  try {
    //console.log('get_general_settings')

    res.locals.general_settings = await req.app.models.judge_user.findOne(
      {
        email: req.user.email,
      },
      `
                full_name
                `
    );
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_general_settings;
