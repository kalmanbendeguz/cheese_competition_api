module.exports = async function (req, res, next) {
  try {
    console.log("mw:get(product/one/get/mw/get)");

    const Allowed_Judge_Model = require("../../../../../../../models/Allowed_Role");

    res.locals.allowed_judge = await Allowed_Judge_Model.findOne(
      res.locals.filter,
      res.locals.projection,
      { lean: true }
    );

    if (!res.locals.allowed_judge) return res.sendStatus(404);

    return next();
  } catch (err) {
    return next(err);
  }
};
