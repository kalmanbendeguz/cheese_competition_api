const cors = require('cors')
const config = require('../config/cors')

module.exports = cors(config)