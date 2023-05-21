const express = require('express')
const router = express.Router()

const check_not_authenticated = require('../middlewares/common/check_not_authenticated')
const get_session_context = require('../middlewares/common/get_session_context')
const redirect = require('../middlewares/common/redirect')
const render = require('../middlewares/common/render')

const check_if_email_allowed_to_register = require('../middlewares/registration/check_if_email_allowed_to_register')
const generate_link = require('../middlewares/registration/generate_link')
const hash_password = require('../middlewares/registration/hash_password')
const save_temporary_registration = require('../middlewares/registration/save_temporary_registration')
const send_verification_email = require('../middlewares/registration/send_verification_email')
const set_confirm_registration_email_sent_context = require('../middlewares/registration/set_confirm_registration_email_sent_context')
const user_with_email_exists = require('../middlewares/registration/user_with_email_exists')
const validate_registration = require('../middlewares/registration/validate_registration')

router.get('/',
    check_not_authenticated,
    get_session_context,
    render('registration')
)

router.post('/',
    check_not_authenticated,
    validate_registration,
    user_with_email_exists,
    check_if_email_allowed_to_register,
    hash_password,
    generate_link,
    save_temporary_registration,
    send_verification_email,
    set_confirm_registration_email_sent_context,
    redirect('/message_unauthenticated')
)

module.exports = router