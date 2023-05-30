module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:check_dependencies(product/one/post/mw/check_dependencies)"
    );
    // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
    // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

    // for all array elements: if it already exists, we cant post it. 1 fail = all fail
    // we know that the req.body email array is unique.

    //  WE KNOW THAT THE EMAILS ARE UNIQUE, IM JUST MAKING SURE HERE.
    const unique_emails = [
      ...new Set(req.body.map((allowed_judge) => allowed_judge.email)),
    ];

    // if any email already exists, operation is not permitted.
    const Allowed_Judge_Model = require("../../../../../../../models/Allowed_Role");
    if (
      await Allowed_Judge_Model.exists({
        _id: { $in: unique_emails },
      })
    )
      return res.sendStatus(409); // = conflict

    return next();
  } catch (err) {
    return next(err);
  }
};
