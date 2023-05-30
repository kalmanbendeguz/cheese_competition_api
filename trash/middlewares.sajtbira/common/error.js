const error = function () {
  const error_mw_production = require("./error_mw_production");
  const error_mw_development = require("./error_mw_development");

  if (typeof process.env.NODE_ENV === "undefined") {
    return error_mw_production;
  } else if (process.env.NODE_ENV === "production") {
    return error_mw_production;
  } else if (process.env.NODE_ENV === "development") {
    return error_mw_development;
  } else {
    return error_mw_production;
  }
};

module.exports = error;
