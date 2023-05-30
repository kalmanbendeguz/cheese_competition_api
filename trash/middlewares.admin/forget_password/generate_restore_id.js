const generate_restore_id = function () {
  const randomstring = require("randomstring");

  return async function (req, res, next) {
    console.log("generate_restore_id");

    res.locals.restore_link_identifier = randomstring.generate(32);

    return next();
  };
};

module.exports = generate_restore_id;
