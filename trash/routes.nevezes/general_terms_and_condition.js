const express = require('express')
const router = express.Router()

const check_not_authenticated = require('../middlewares/common/check_not_authenticated')
const get_session_context = require('../middlewares/common/get_session_context')
const redirect = require('../middlewares/common/redirect')
const render = require('../middlewares/common/render')

router.get('/',
    check_not_authenticated,
    get_session_context,
    render('general_terms_and_condition')
)

module.exports = router