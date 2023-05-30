module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:update_dependencies(product/one/post/mw/update_dependencies)"
    );

    if (
      "email" in req.body &&
      req.body.email !== res.locals.allowed_judge.email
    ) {
      // =if email changes. //req.body.email can be undefined
      const axios = require("axios");

      // remove the old organizers role
      const remove_promise = axios({
        url: "/api/a/user/o",
        method: "put",
        baseURL: process.env.SERVER_URL,
        params: {
          email: res.locals.allowed_judge.email,
        },
        data: {
          roles: "-judge", // important: ezt a controlleres verzióban úgy akarom használni, hogy ne saját
          // szintaxis kelljen, hanem jó legyen a mongo-é.
        },
      });

      // add the new organizers role
      const add_promise = axios({
        url: "/api/a/user/o",
        method: "put",
        baseURL: process.env.SERVER_URL,
        params: {
          email: req.body.email,
        },
        data: {
          roles: "+judge",
        },
      });

      await Promise.all(remove_promise, add_promise);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
