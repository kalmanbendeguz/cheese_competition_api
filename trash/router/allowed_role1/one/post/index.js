const express = require('express')
const router = express.Router()

const validate_request = require('./mw/validate_request')
const authorize = require('./mw/authorize')
const check_dependencies = require('./mw/check_dependencies')
const prepare = require('./mw/prepare')
const create = require('./mw/create')
const validate_document = require('./mw/validate_document')
const update_dependencies = require('./mw/update_dependencies')
const save = require('./mw/save')
const reply = require('./mw/reply')

// default values (sync + async)
// validation: request + document
// check duplication (some fields need to be unique)

router.post('/',
    validate_request,
    authorize,
    check_dependencies,
    prepare,
    create,
    validate_document,
    update_dependencies,
    save,
    reply
)

module.exports = router