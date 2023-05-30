const remove_temporary_rating_pictures = async function (req, res, next) {
  try {
    //console.log('remove_temporary_rating_pictures')

    if (!(req.user.table_leader ?? false)) return next();

    await res.locals.temporary_rating_picture.remove();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = remove_temporary_rating_pictures;
