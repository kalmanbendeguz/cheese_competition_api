module.exports = async function (req, res, next) {
  try {
    console.log("mw:remove_dependent(product/one/del/mw/remove_dependent)");

    // DEL

    // we should remove the role of the removed email's user, if he exists.
    const axios = require("axios");

    // remove the old organizers role
    const remove_response = await axios({
      url: "/api/a/user/o",
      method: "put",
      baseURL: process.env.SERVER_URL,
      params: {
        email: res.locals.allowed_judge.email,
      },
      data: {
        roles: "-judge",
      },
    });

    return next();
  } catch (err) {
    return next(err);
  }
};
