const save_cheese = async function (req, res, next) {
  try {
    //console.log('save_cheese')

    await req.app.models.cheese.create(res.locals.cheese);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_cheese;
