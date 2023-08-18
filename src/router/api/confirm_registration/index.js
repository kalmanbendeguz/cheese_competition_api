const express = require('express')
const router = express.Router()

const confirm_registration = require('../../../controllers/actions/confirm_registration')

router.get('/', confirm_registration)

module.exports = router