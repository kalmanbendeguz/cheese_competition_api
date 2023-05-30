module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:check_dependencies(product/many/put/mw/check_dependencies)"
    );
    // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
    // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

    // a competitor can only edit if the competition is opened
    // an organizer can only edit if the competition is not archived
    // only one competition_id: req.body.competiti

    // 1. check if all the old products competitions are opened or not archived
    const unique_old_competition_ids = [
      ...new Set(
        res.locals.products.map((product) => product.competition_id.toString())
      ),
    ];
    const Competition_Model = require("../../../../../../../models/Competition");

    if (
      (await Competition_Model.countDocuments({
        _id: { $in: unique_old_competition_ids },
        ...(req.user.role === "competitor" && { entry_opened: true }),
        ...(req.user.role === "organizer" && { archived: false }),
      })) !== unique_old_competition_ids.length
    )
      return res.sendStatus(403);

    // 2. check if the new competition (one) is opened or not archived
    if (
      "competition_id" in req.body &&
      !(await Competition_Model.exists({
        _id: req.body.competition_id,
        ...(req.user.role === "competitor" && { entry_opened: true }),
        ...(req.user.role === "organizer" && { archived: false }),
      }))
    )
      return res.sendStatus(403);

    // 3. check if the NEW manufacturer_id belongs to a competitor AND his registration is not temporary
    const User_Model = require("../../../../../../../models/User");

    if (
      "manufacturer_id" in req.body &&
      !(await User_Model.exists({
        _id: req.body.manufacturer_id,
        roles: { $in: ["competitor"] },
        registration_temporary: false,
      }))
    )
      return res.sendStatus(403);

    // 4. check if we want to change any product's paid field if it was payment.
    // if even one fails, all fails
    if (
      req.body.approval_type !== "payment" &&
      res.locals.products.some((product) => product.approval_type === "payment")
    )
      return res.sendStatus(403);

    return next();
  } catch (err) {
    return next(err);
  }
};
