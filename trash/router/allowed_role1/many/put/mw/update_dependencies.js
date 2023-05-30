module.exports = async function (req, res, next) {
  try {
    console.log(
      "mw:update_dependencies(product/one/many/mw/update_dependencies)"
    );

    if (
      "email" in req.body &&
      res.locals.allowed_judges.some(
        (allowed_judge) => allowed_judge.email !== req.body.email
      )
    ) {
      // =if email changes. //we know that the array can only contain 0 or 1 elements.
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

      // add the new organizers role
      // what if the query found no document? then no documents would have this new email,
      // because there was no document to change.
      // if the query found no document, then res.locals.all_org is empty, so array.some() is false so this not runs.
      // we use user/M for future compatibility and consistency:
      // the query could have found multiple documents, changing their role, these users could be queried by this email
      // value, but this is unique now, but lets be consistent.
      const add_promise = axios({
        url: "/api/a/user/m",
        method: "put",
        baseURL: process.env.SERVER_URL,
        params: {
          email: req.body.email,
        },
        data: {
          roles: "+judge",
        },
      });

      await Promise.all(...remove_promises, add_promise);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
