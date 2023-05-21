const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const check_entry_opened = require('../middlewares/common/check_entry_opened')
const get_session_context = require('../middlewares/common/get_session_context')
const redirect = require('../middlewares/common/redirect')
const render = require('../middlewares/common/render')

const check_if_user_is_association_member = require('../middlewares/confirm_cheese/check_if_user_is_association_member')
const get_receipt_settings = require('../middlewares/confirm_cheese/get_receipt_settings')
const check_temporary_cheese_belongs_to_user_get = require('../middlewares/confirm_cheese/check_temporary_cheese_belongs_to_user_get')
const check_temporary_cheese_belongs_to_user_post = require('../middlewares/confirm_cheese/check_temporary_cheese_belongs_to_user_post')
const get_temporary_cheese_get = require('../middlewares/confirm_cheese/get_temporary_cheese_get')
const get_temporary_cheese_post = require('../middlewares/confirm_cheese/get_temporary_cheese_post')
const remove_temporary_cheese = require('../middlewares/confirm_cheese/remove_temporary_cheese')
const save_unpaid_cheese = require('../middlewares/confirm_cheese/save_unpaid_cheese')
const set_confirm_unpaid_cheese_successful_context = require('../middlewares/confirm_cheese/set_confirm_unpaid_cheese_successful_context')

router.get('/',
    check_authenticated,
    get_session_context,
    check_entry_opened,
    get_temporary_cheese_get,
    check_temporary_cheese_belongs_to_user_get,
    render('confirm_cheese')
)

router.post('/',
    check_authenticated,
    check_entry_opened,
    get_temporary_cheese_post,
    check_temporary_cheese_belongs_to_user_post,
    get_receipt_settings,
    check_if_user_is_association_member,
    save_unpaid_cheese,
    remove_temporary_cheese,
    set_confirm_unpaid_cheese_successful_context,
    redirect('/landing')
)

module.exports = router