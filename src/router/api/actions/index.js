const express = require('express')
const router_options = require('../../../config/router')
const router = express.Router(router_options)


const confirm_registration = require('./confirm_registration')
router.use('/confirm_registration', confirm_registration)

const current_role = require('./current_role')
router.use('/current_role', current_role)

const forget_password = require('./forget_password')
router.use('/forget_password', forget_password)

const login = require('./login')
router.use('/login', login)

const logout = require('./logout')
router.use('/logout', logout)

const registration = require('./registration')
router.use('/registration', registration)


module.exports = router