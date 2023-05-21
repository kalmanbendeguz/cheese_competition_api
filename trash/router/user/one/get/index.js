const express = require('express')
const router = express.Router()

const validate_request = require('./mw/validate_request')
const authorize = require('./mw/authorize')
const prepare_get = require('./mw/prepare_get')
const get = require('./mw/get')
const send = require('./mw/send')

// validation: request + document

router.get('/',
    validate_request,
    authorize,
    prepare_get,
    get,
    send
)

module.exports = router