module.exports = async function (req, res, next) {
  try {
    console.log("mw:reply(product/many/post/mw/reply)");

    // there is NOTHING EXCLUSIVELY COMMON about the posted products, so we cannot set res.location
    // e.g. their manufacturer is the same, but there might be another, previous products of the same manufacturer.
    //res.location(`/api/a/product/o?public_id=${res.locals.product.public_id}`)

    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};
