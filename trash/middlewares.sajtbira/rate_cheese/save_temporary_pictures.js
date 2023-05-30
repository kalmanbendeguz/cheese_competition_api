const save_temporary_pictures = async function (req, res, next) {
  try {
    //console.log('save_temporary_pictures')

    if (!(req.user.table_leader ?? false)) return next();

    await req.app.models.temporary_rating_picture.findOneAndUpdate(
      {
        confirm_id: res.locals.confirm_id,
      },
      {
        pictures: req.files,
      },
      { upsert: true }
    );

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = save_temporary_pictures;
