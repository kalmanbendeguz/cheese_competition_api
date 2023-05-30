const format_billing_information = function (req, res, next) {
  try {
    //console.log('format_billing_information')

    const counties_by_zip = require("../../static/json/counties_by_zip");
    const billing_county = counties_by_zip[req.user.billing_zip];

    const iso_3166_2_by_county = require("../../static/json/iso_3166_2_by_county");
    res.locals.billing_region_iso_3166_2 = iso_3166_2_by_county[billing_county];

    const iso_3166_2_by_city = require("../../static/json/iso_3166_2_by_city");
    const billing_city_iso_3166_2 = iso_3166_2_by_city[req.user.billing_city];
    if (billing_city_iso_3166_2)
      res.locals.billing_region_iso_3166_2 = billing_city_iso_3166_2;

    let street_array = [
      req.user.billing_street,
      req.user.billing_street_type,
      req.user.billing_house_number,
      req.user.billing_address_details,
    ];

    res.locals.street = "";
    while (
      street_array.length > 0 &&
      res.locals.street.length + 1 + street_array[0].length <= 50
    ) {
      const part = street_array.shift();
      res.locals.street += ` ${part}`;
    }

    res.locals.street2 = "";
    while (
      street_array.length > 0 &&
      res.locals.street2.length + 1 + street_array[0].length <= 50
    ) {
      const part = street_array.shift();
      res.locals.street2 += ` ${part}`;
    }
    if (res.locals.street2 === "") res.locals.street2 = undefined;

    res.locals.street3 = "";
    while (
      street_array.length > 0 &&
      res.locals.street3.length + 1 + street_array[0].length <= 50
    ) {
      const part = street_array.shift();
      res.locals.street3 += ` ${part}`;
    }
    if (res.locals.street3 === "") res.locals.street3 = undefined;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = format_billing_information;
