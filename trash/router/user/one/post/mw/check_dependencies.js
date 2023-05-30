module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:check_dependencies(product/one/post/mw/check_dependencies)"
    );
    // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
    // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

    //competition exists and opened?
    const Competition_Model = require("../../../../../../../models/Competition");
    if (
      !(await Competition_Model.exists({
        _id: req.body.competition_id,
        entry_opened: true,
      }))
    )
      return res.sendStatus(403);

    // we could check if the user's registration is temporary or not
    // but if the reg. is temporary, the user wouldnt even get authenticated,
    // so no need to check this.

    return next();
  } catch (err) {
    return next(err);
  }
};
