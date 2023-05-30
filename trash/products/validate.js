module.exports = async function (req, res, next) {
  try {
    console.log("validate");

    // validate req object:
    // sure: query
    // sure: body
    // sure: cookies

    // session: it is added by backend, the only thing that can come with a request is a session_id cookie. but i still think
    // that i need to validate this ....

    // etc... (see express documentation...)

    // if we validate BEFORE calling the session middleware, req.session WON'T BE PRESENT ! )
    // req.session? (not there by default, it is added by middleware.

    // (no need, because validation is before authentication) req.user?
    // (no need, because it would not even reach the endpoint if the method is not right) method

    return next();
  } catch (err) {
    return next(err);
  }
};
