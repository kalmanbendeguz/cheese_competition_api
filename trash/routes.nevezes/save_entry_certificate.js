const express = require('express')
const router = express.Router()

const get_res_locals_from_session = require('../middlewares/common/get_res_locals_from_session')
const redirect = require('../middlewares/common/redirect')

const remove_temporary_cheese = require('../middlewares/confirm_cheese/remove_temporary_cheese')
const save_cheese = require('../middlewares/confirm_cheese/save_cheese')
const save_entry_certificate = require('../middlewares/confirm_cheese/save_entry_certificate')
const set_successful_entry_with_certificate_context = require('../middlewares/confirm_cheese/set_successful_entry_with_certificate_context')

router.use('/',
    get_res_locals_from_session,
    save_cheese,
    remove_temporary_cheese,
    save_entry_certificate,
    set_successful_entry_with_certificate_context,
    redirect('/landing')
)

module.exports = router