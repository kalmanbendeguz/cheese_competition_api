const express = require('express')

const express_urlencoded = require('../middlewares/express_urlencoded')
const express_json = require('../middlewares/express_json')
const cors = require('../middlewares/cors')
const decode_query_q = require('../middlewares/decode_query_q')
const cookie_parser = require('../middlewares/cookie_parser') 

const router = express.Router({
    caseSensitive: true,
    mergeParams: true,
    strict: false,
})

// Application-level middlewares
router.use(
    cors,
    express_urlencoded,
    express_json,
    decode_query_q,
    cookie_parser,
)

// API router
const api = require('./api')
router.use('/api', api)

module.exports = router