const get_billing_settings = async function (req, res, next) {
  try {
    //console.log('get_billing_settings')

    res.locals.billing_settings = await req.app.models.user.findOne(
      { email: req.user.email },
      `
                -_id
                billing_name
                billing_tax_number
                billing_zip
                billing_city
                billing_street
                billing_street_type
                billing_house_number
                billing_address_details
                `
    );

    return next();
  } catch (err) {}
};

module.exports = get_billing_settings;
