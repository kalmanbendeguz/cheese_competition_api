module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:check_dependencies(product/one/post/mw/check_dependencies)"
    );
    // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE DELETED?
    // ARE ALL THE DEPENDENTS OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE DELETED?

    return next();
  } catch (err) {
    return next(err);
  }
};
