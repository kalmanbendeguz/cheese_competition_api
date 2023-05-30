const remove_active_password_reset = function () {
  return async function (req, res, next) {
    console.log("remove_active_password_reset");

    await res.locals.active_password_reset.remove();

    return next();
  };
};

module.exports = remove_active_password_reset;
