module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:update_dependencies(product/one/post/mw/update_dependencies)"
    );

    return next();
  } catch (err) {
    return next(err);
  }
};
