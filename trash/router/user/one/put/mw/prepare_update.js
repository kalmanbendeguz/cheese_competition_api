module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare_update(product/one/put/mw/prepare_update)");

    res.locals.update = {
      ...(req.body.competition_id && {
        competition_id: req.body.competition_id,
      }), // should check if exists and opened
      ...(req.body.manufacturer_id && {
        manufacturer_id: req.body.manufacturer_id,
      }), // should check if exists and competitor
      ...(req.body.product_name && { product_name: req.body.product_name }),
      ...(req.body.factory_name && { factory_name: req.body.factory_name }),
      ...(req.body.maturation_time_type && {
        maturation_time_type: req.body.maturation_time_type,
      }),
      ...(req.body.maturation_time_quantity && {
        maturation_time_quantity: req.body.maturation_time_quantity,
      }),
      ...(req.body.maturation_time_unit && {
        maturation_time_unit: req.body.maturation_time_unit,
      }),
      ...(req.body.milk_type && { milk_type: req.body.milk_type }),
      ...(req.body.product_category_list && {
        product_category_list: req.body.product_category_list,
      }),
      ...(req.body.product_description && {
        product_description: req.body.product_description,
      }),
      ...(req.body.approved && { approved: req.body.approved }),
      ...(req.body.approval_type && { approval_type: req.body.approval_type }),
      ...(req.body.handed_in && { handed_in: req.body.handed_in }),
    };

    res.locals.remove = [
      ...(req.body.maturation_time_type === "fresh"
        ? ["maturation_time_quantity", "maturation_time_unit"]
        : []),
      ...(req.body.approved === false ? ["approval_type"] : []), //kihasználjuk, hogy az (undefined === false) NEM UGYANAZ, MINT (!undefined) !!!
    ];

    return next();
  } catch (err) {
    return next(err);
  }
};
