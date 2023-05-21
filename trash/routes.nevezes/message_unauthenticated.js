const express = require('express')
const router = express.Router()

const get_session_context = require('../middlewares/common/get_session_context')
const render = require('../middlewares/common/render')

const check_message_unauthenticated = require('../middlewares/message_unauthenticated/check_message_unauthenticated')

router.get('/',
    check_message_unauthenticated,
    get_session_context,
    render('message_unauthenticated')
)

module.exports = router