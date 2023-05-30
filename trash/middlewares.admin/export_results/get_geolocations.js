const get_geolocations = function () {
  return async function (req, res, next) {
    console.log("get_geolocations");

    const counties_by_zip = require("../../static/counties_by_zip");

    for (let i = 0; i < res.locals.cheeses.length; ++i) {
      res.locals.cheeses[i].user.billing_zip =
        res.locals.cheeses[i].user.billing_zip.trim();
      res.locals.cheeses[i].zip_string = res.locals.cheeses[i].user.billing_zip;
      res.locals.cheeses[i].city = res.locals.cheeses[i].user.billing_city;
      res.locals.cheeses[i].county =
        counties_by_zip[res.locals.cheeses[i].user.billing_zip];
    }

    return next();
  };
};

module.exports = get_geolocations;
