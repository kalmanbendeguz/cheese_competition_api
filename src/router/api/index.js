const express = require('express')
const router_options = require('../../config/router')

const assign_special_role = require('../../middlewares/api/assign_special_role')
const authorize_endpoint = require('../../middlewares/api/authorize_endpoint')
const passport_authenticate = require('../../middlewares/api/passport_authenticate')
const passport_initialize = require('../../middlewares/api/passport_initialize')
const session = require('../../middlewares/api/session')
const validate = require('../../middlewares/api/validate')

const router = express.Router(router_options)


// API-level middlewares
router.use('/',
    validate,
    session,
    passport_initialize,
    passport_authenticate,
    assign_special_role,
    authorize_endpoint,
)


/* 
    Resource router
*/
const resources = require('./resources')
router.use('/resources', resources)


/* 
    Action router
*/
const actions = require('./actions')
router.use('/actions', actions)

module.exports = router