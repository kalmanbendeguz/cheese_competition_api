const cors = require('cors')
const config = require('../config/cors')

const cors_mw = cors(config)

module.exports = cors_mw