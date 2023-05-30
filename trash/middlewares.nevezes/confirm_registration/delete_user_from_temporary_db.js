const delete_user_from_temporary_db = async function (req, res, next) {
  try {
    //console.log('delete_user_from_temporary_db')

    await res.locals.temporary_registration.remove();

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = delete_user_from_temporary_db;
