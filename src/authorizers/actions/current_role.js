const valid_roles = require('../../static/valid_roles.json')

const authorized_roles = valid_roles.concat(['ROLELESS', 'UNAUTHENTICATED'])
// This means: SERVER can not current_role

module.exports = authorized_roles