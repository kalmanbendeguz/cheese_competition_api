// NEEDBACK
const express = require('express')
const router = express.Router()

const am_i_logged_id = require('../../../controllers/actions/am_i_logged_in')

router.get('/', am_i_logged_id)

module.exports = router