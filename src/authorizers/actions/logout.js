const valid_roles = require('../../static/valid_roles.json')

const authorized_roles = valid_roles.concat(['ROLELESS'])
// This means: SERVER and UNAUTHENTICATED can not logout

module.exports = authorized_roles