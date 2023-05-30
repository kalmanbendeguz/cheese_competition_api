const get_entry_certificates = async function (req, res, next) {
  try {
    //console.log('get_entry_certificates')

    for (let cheese of res.locals.cheeses) {
      cheese.entry_certificate = await req.app.models.entry_certificate.exists({
        product_id: cheese._id,
      });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_entry_certificates;
