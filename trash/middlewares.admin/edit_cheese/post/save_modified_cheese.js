const save_modified_cheese = function () {
  return async function (req, res, next) {
    console.log("save_modified_cheese");

    await res.locals.cheese.save();

    return next();
  };
};

module.exports = save_modified_cheese;
