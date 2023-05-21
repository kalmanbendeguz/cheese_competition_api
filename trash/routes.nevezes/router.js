const express = require('express')
const router = express.Router()
const error_middleware = require('../middlewares/common/error')

const all_paths_router = require('./all_paths')
router.use(all_paths_router)

const base_router = require('./base')
router.use('/', base_router)

const set_language_router = require('./set_language')
router.use('/set_language', set_language_router)

const message_authenticated_router = require('./message_authenticated')
router.use('/message_authenticated', message_authenticated_router)

const message_unauthenticated_router = require('./message_unauthenticated')
router.use('/message_unauthenticated', message_unauthenticated_router)

const login_router = require('./login')
router.use('/login', login_router)

const logout_router = require('./logout')
router.use('/logout', logout_router)

const general_terms_and_condition_router = require('./general_terms_and_condition')
router.use('/general_terms_and_condition', general_terms_and_condition_router)

const privacy_policy_router = require('./privacy_policy')
router.use('/privacy_policy', privacy_policy_router)

const registration_router = require('./registration')
router.use('/registration', registration_router)

const confirm_registration_router = require('./confirm_registration')
router.use('/confirm_registration', confirm_registration_router)

const forget_password_router = require('./forget_password')
router.use('/forget_password', forget_password_router)

const restore_password_router = require('./restore_password')
router.use('/restore_password', restore_password_router)

const landing_router = require('./landing')
router.use('/landing', landing_router)

const notice_router = require('./notice')
router.use('/notice', notice_router)

const settings_router = require('./settings')
router.use('/settings', settings_router)

const new_cheese_router = require('./new_cheese')
router.use('/new_cheese', new_cheese_router)

const confirm_cheese_router = require('./confirm_cheese')
router.use('/confirm_cheese', confirm_cheese_router)

const modify_new_cheese_router = require('./modify_new_cheese')
router.use('/modify_new_cheese', modify_new_cheese_router)

const view_cheese_router = require('./view_cheese')
router.use('/view_cheese', view_cheese_router)

const edit_cheese_router = require('./edit_cheese')
router.use('/edit_cheese', edit_cheese_router)

const remove_cheese_router = require('./remove_cheese')
router.use('/remove_cheese', remove_cheese_router)

const send_feedback_router = require('./send_feedback')
router.use('/send_feedback', send_feedback_router)

const archive_router = require('./archive')
router.use('/archive', archive_router)

const view_archived_cheese_router = require('./view_archived_cheese')
router.use('/view_archived_cheese', view_archived_cheese_router)

const save_entry_certificate_router = require('./save_entry_certificate')
router.use('/save_entry_certificate', save_entry_certificate_router)

const unpaid_entry_fee_payment_router = require('./unpaid_entry_fee_payment')
router.use('/unpaid_entry_fee_payment', unpaid_entry_fee_payment_router)

const entry_fee_payment_callback_router = require('./entry_fee_payment_callback')
router.use('/entry_fee_payment_callback', entry_fee_payment_callback_router)

const entry_fee_payment_redirect_router = require('./entry_fee_payment_redirect')
router.use('/entry_fee_payment_redirect', entry_fee_payment_redirect_router)

const static_router = require('./static')
router.use('/static', static_router)

const default_router = require('./default')
router.use(default_router)

router.use(error_middleware())

module.exports = router