module.exports = async function (req, res, next) {
  try {
    console.log("mw:get(product/many/get/mw/get)");

    const Allowed_Judge_Model = require("../../../../../../../models/Allowed_Role");

    res.locals.allowed_judges = await Allowed_Judge_Model.find(
      res.locals.filter,
      res.locals.projection,
      res.locals.options
    );

    return next();
  } catch (err) {
    return next(err);
  }
};
