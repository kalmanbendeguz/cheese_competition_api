const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')

const logout = require('../middlewares/logout/logout')

router.get('/',
    check_authenticated,
    logout
)

module.exports = router