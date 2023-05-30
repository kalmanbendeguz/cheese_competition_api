module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:check_dependencies(product/one/post/mw/check_dependencies)"
    );
    // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE DELETED?
    // ARE ALL THE DEPENDENTS OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE DELETED?

    // we could check if the user's registration is temporary or not
    // but if the reg. is temporary, the user wouldnt even get authenticated,
    // so no need to check this.

    //competitor can only remove if the entry is opened.
    //organizer can only remove if competition is not archived.
    const Competition_Model = require("../../../../../../../models/Competition");

    if (
      !(await Competition_Model.exists({
        _id: res.locals.product.competition_id,
        ...(req.user.role === "competitor" && { entry_opened: true }),
        ...(req.user.role === "organizer" && { archived: false }),
      }))
    )
      return res.sendStatus(403);

    //its not possible to remove a paid product.
    if (res.locals.product.approval_type === "payment")
      return res.sendStatus(403);

    return next();
  } catch (err) {
    return next(err);
  }
};
