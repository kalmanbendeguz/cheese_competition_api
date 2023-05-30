// 1. express.urlencoded() and express.json(), etc. http body => req.body
// 2. express-session. http header (session cookie) => get session data from db => req.session

// the request is unauthenticated, but it might still need a session. e.g for rate limiting? or anything else. it is needed.
// passport.initialize() and and passport.session() are not needed

// 3. request validation. with joi. sends proper error messages.

// at this point the request is prepared. (what prepared means: every context is present and valid. context means ...)
// authentication is not needed
// authorization is not needed

// 4. getting data from db
// 5. sending data back to the client
