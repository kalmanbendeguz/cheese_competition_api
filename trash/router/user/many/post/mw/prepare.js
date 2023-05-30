module.exports = async function (req, res, next) {
  try {
    console.log("mw:prepare(product/one/post/mw/prepare)");
    // GOAL: PRODUCE FILTER AND PROJECTION OBJECTS COMPLETELY.
    // NO ERRORS OR DENIALS SHOULD HAPPEN HERE
    // BUT CONDITIONAL LOGIC CAN TAKE PLACE

    const manufacturer_id = req.user._id; // we know he is a competitor

    const randomstring = require("randomstring");
    const forbidden_id_parts = require("../../../../../../../static/forbidden_id_parts");
    const Product_Model = require("../../../../../../../models/Product");

    let existing_product;
    let is_forbidden_part;
    const public_ids = [];
    const secret_ids = [];

    for (const _ of req.body) {
      let public_id;
      do {
        const letters = randomstring.generate({
          length: 3,
          charset: "alphabetic",
          capitalization: "lowercase",
        });
        const numbers = randomstring.generate({
          length: 3,
          charset: "numeric",
        });
        public_id = `${letters}${numbers}`;
        existing_product =
          (await Product_Model.exists({ public_id: public_id })) ||
          (await Product_Model.exists({ secret_id: public_id })) ||
          public_ids.includes(public_id);

        is_forbidden_part = forbidden_id_parts.includes(letters);
      } while (existing_product || is_forbidden_part);
      public_ids.push(public_id);

      let secret_id;
      do {
        const letters = randomstring.generate({
          length: 3,
          charset: "alphabetic",
          capitalization: "lowercase",
        });
        const numbers = randomstring.generate({
          length: 3,
          charset: "numeric",
        });
        secret_id = `${letters}${numbers}`;
        existing_product =
          (await Product_Model.exists({ public_id: secret_id })) ||
          (await Product_Model.exists({ secret_id: secret_id })) ||
          secret_ids.includes(secret_id);

        is_forbidden_part = forbidden_id_parts.includes(letters);
      } while (existing_product || is_forbidden_part);
      secret_ids.push(secret_id);
    }

    res.locals._products = req.body.map((product, i) => ({
      competition_id: product.competition_id,
      manufacturer_id: manufacturer_id,
      public_id: public_ids[i],
      secret_id: secret_ids[i],
      product_name: product.product_name,
      factory_name: product.factory_name,
      maturation_time_type: product.maturation_time_type,
      ...(product.maturation_time_type === "matured" && {
        maturation_time_quantity: product.maturation_time_quantity,
      }),
      ...(product.maturation_time_type === "matured" && {
        maturation_time_unit: product.maturation_time_unit,
      }),
      milk_type: product.milk_type,
      product_category_list: product.product_category_list,
      product_description: product.product_description,
    }));

    return next();
  } catch (err) {
    return next(err);
  }
};
