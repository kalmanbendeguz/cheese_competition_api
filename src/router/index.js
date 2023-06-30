const express = require('express')

const express_urlencoded = require('./mw/express_urlencoded')
const express_json = require('./mw/express_json')
const cors = require('./mw/cors')
const decode_query_q = require('./mw/decode_query_q')
const cookie_parser = require('./mw/cookie_parser') // NEEDBACK

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
    (req,res,next) => {console.log('DEBUGrouter', req.body, req.user, req.session, req.cookies); return next()},
    decode_query_q,
    cookie_parser,
    (req,res,next) => {console.log('DEBUGrouter', req.body, req.user, req.session, req.cookies); return next()}
)

// API router
const api = require('./api')
router.use('/api', api)

module.exports = router