const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const get_session_context = require('../middlewares/common/get_session_context')
const redirect = require('../middlewares/common/redirect')

const get_payment_status = require('../middlewares/entry_fee_payment_redirect/get_payment_status')
const set_status_context = require('../middlewares/entry_fee_payment_redirect/set_status_context')

router.get('/',
    check_authenticated,
    get_session_context,
    get_payment_status,
    set_status_context,
    redirect('/landing')
)

module.exports = router