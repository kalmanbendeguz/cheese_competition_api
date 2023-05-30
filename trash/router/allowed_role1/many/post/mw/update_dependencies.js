module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:update_dependencies(product/one/many/mw/update_dependencies)"
    );

    // res.locals.allowed_organizers
    // if a user already exists with this email, we should give them the organizer role
    const axios = require("axios");

    const update_dependency_promises = res.locals.allowed_judges.map(
      (allowed_judge) =>
        axios({
          url: "/api/a/user/o",
          method: "put",
          baseURL: process.env.SERVER_URL,
          params: {
            email: allowed_judge.email,
          },
          data: {
            roles: "+judge",
          },
        })
    );
    // this can be optimized if i implement the endpoints so that the filter is exactly a mongoose filter format.

    await Promise.all(update_dependency_promises);

    return next();
  } catch (err) {
    return next(err);
  }
};
