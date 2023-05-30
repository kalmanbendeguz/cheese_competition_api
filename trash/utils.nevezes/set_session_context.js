const set_session_context = function (session, key, value) {
  //console.log('set_session_context')

  if (typeof session === "undefined") return; // // if session not exists, nothing to do
  if (typeof session.context === "undefined") session.context = {};

  // undefined, Array, and "anything else" is distinct and matches our requirements
  if (typeof session.context[key] === "undefined") {
    session.context[key] = value;
  } else if (Array.isArray(session.context[key])) {
    session.context[key].push(value);
  } else {
    session.context[key] = [session.context[key], value];
  }
};

module.exports = set_session_context;
