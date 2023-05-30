const delete_user_from_temporary_db = function () {
  return async function (req, res, next) {
    console.log("delete_user_from_temporary_db");

    await res.locals.temporary_registration.remove();

    return next();
  };
};

module.exports = delete_user_from_temporary_db;
