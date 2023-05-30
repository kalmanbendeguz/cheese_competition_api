const express = require('express')

const express_urlencoded = require('./mw/express_urlencoded')
const express_json = require('./mw/express_json')

const router = express.Router({
    caseSensitive: true,
    mergeParams: true,
    strict: false,
})

// Application-level middlewares
router.use(express_urlencoded, express_json)

// API router
const api = require('./api')
router.use('/api', api)

module.exports = router
