const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const get_session_context = require('../middlewares/common/get_session_context')
const render = require('../middlewares/common/render')

const get_cheeses = require('../middlewares/landing/get_cheeses')
const get_entry_certificates = require('../middlewares/landing/get_entry_certificates')
const get_entry_fee_payments = require('../middlewares/landing/get_entry_fee_payments')
const get_paid_competition_info = require('../middlewares/landing/get_paid_competition_info')
const get_page_number = require('../middlewares/landing/get_page_number')
const get_payment_information = require('../middlewares/landing/get_payment_information')

router.get('/',  
    check_authenticated,
    get_session_context,
    get_page_number,
    get_cheeses,
    get_entry_fee_payments,
    get_entry_certificates,
    get_paid_competition_info,
    get_payment_information,
    render('landing')
)

module.exports = router