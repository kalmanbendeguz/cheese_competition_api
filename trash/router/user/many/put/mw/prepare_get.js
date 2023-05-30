module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare_get(product/one/put/mw/prepare_get)");

    // GOAL: PRODUCE FILTER OBJECT COMPLETELY. NO ERRORS OR DENIALS SHOULD HAPPEN HERE
    // BUT CONDITIONAL LOGIC CAN TAKE PLACE

    // id
    // manufacturer_id
    // public_id
    // secret_id

    const manufacturer_id =
      req.user.role === "competitor" ? req.user._id : req.query.manufacturer_id;

    res.locals.filter = {
      ...(req.query._id && { _id: req.query._id }),
      ...(req.query.competition_id && {
        competition_id: req.query.competition_id,
      }),
      ...(manufacturer_id && { manufacturer_id: manufacturer_id }),
      ...(req.query.public_id && { public_id: req.query.public_id }),
      ...(req.query.secret_id && { secret_id: req.query.secret_id }),
      ...(req.query.product_name && { product_name: req.query.product_name }),
      ...(req.query.factory_name && { factory_name: req.query.factory_name }),
      ...(req.query.maturation_time_type && {
        maturation_time_type: req.query.maturation_time_type,
      }),
      ...(req.query.maturation_time_quantity && {
        maturation_time_quantity: req.query.maturation_time_quantity,
      }),
      ...(req.query.maturation_time_unit && {
        maturation_time_unit: req.query.maturation_time_unit,
      }),
      ...(req.query.milk_type && { milk_type: req.query.milk_type }),
      ...(req.query.product_category_list && {
        product_category_list: req.query.product_category_list,
      }),
      ...(req.query.approved && { approved: req.query.approved }),
      ...(req.query.approval_type && {
        approval_type: req.query.approval_type,
      }),
      ...(req.query.handed_in && { handed_in: req.query.handed_in }),
    };

    return next();
  } catch (err) {
    return next(err);
  }
};
