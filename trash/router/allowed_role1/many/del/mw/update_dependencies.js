module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:update_dependencies(product/one/many/mw/update_dependencies)"
    );

    const axios = require("axios");

    // remove the old organizers role
    const remove_promises = res.locals.allowed_judges.map((allowed_judge) =>
      axios({
        url: "/api/a/user/o",
        method: "put",
        baseURL: process.env.SERVER_URL,
        params: {
          email: allowed_judge.email,
        },
        data: {
          roles: "-judge",
        },
      })
    );

    await Promise.all(remove_promises);

    return next();
  } catch (err) {
    return next(err);
  }
};
