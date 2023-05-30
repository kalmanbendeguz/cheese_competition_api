module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:update_dependencies(product/one/post/mw/update_dependencies)"
    );

    // if a user already exists with this email, we should give them the organizer role
    const axios = require("axios");

    const response = await axios({
      url: "/api/a/user/o",
      method: "put",
      baseURL: process.env.SERVER_URL,
      params: {
        email: res.locals.allowed_judge.email,
      },
      data: {
        roles: "+judge",
      },
    });

    return next();
  } catch (err) {
    return next(err);
  }
};
