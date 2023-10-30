const express = require('express')
const router_options = require('../config/router')

const validate = require('../middlewares/validate')
const cors = require('../middlewares/cors')
const express_urlencoded = require('../middlewares/express_urlencoded')
const express_json = require('../middlewares/express_json')
const decode_query_json = require('../middlewares/decode_query_json')
const cookie_parser = require('../middlewares/cookie_parser')

const router = express.Router(router_options)

// Application-level middlewares
router.use(
    validate,
    cors,
    express_urlencoded,
    express_json,
    decode_query_json,
    cookie_parser,
)

// API router
const api = require('./api')
router.use('/api', api)

module.exports = router