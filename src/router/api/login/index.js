const express = require('express')
const router = express.Router()

const login = require('../../../controllers/actions/loginn')

router.post('/', login)

module.exports = router