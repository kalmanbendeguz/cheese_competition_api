const express = require('express')
const router = express.Router()

const get_session_context = require('../middlewares/common/get_session_context')
const redirect = require('../middlewares/common/redirect')

const check_link_valid = require('../middlewares/confirm_registration/check_link_valid')
const delete_user_from_temporary_db = require('../middlewares/confirm_registration/delete_user_from_temporary_db')
const save_registered_user = require('../middlewares/confirm_registration/save_registered_user')
const set_successful_registration_context = require('../middlewares/confirm_registration/set_successful_registration_context')

router.get('/',
    get_session_context,
    check_link_valid,
    save_registered_user,
    delete_user_from_temporary_db,
    set_successful_registration_context,
    redirect('/login')
)

module.exports = router