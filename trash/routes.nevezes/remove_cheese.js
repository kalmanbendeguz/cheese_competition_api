const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const redirect = require('../middlewares/common/redirect')

const check_cheese_belongs_to_user = require('../middlewares/remove_cheese/check_cheese_belongs_to_user')
const check_cheese_exists = require('../middlewares/remove_cheese/check_cheese_exists')
const check_entry_opened = require('../middlewares/common/check_entry_opened')
const remove_cheese = require('../middlewares/remove_cheese/remove_cheese')
const set_remove_successful_context = require('../middlewares/remove_cheese/set_remove_successful_context')

router.post('/',
    check_authenticated,
    check_entry_opened,
    check_cheese_exists,
    check_cheese_belongs_to_user,
    remove_cheese,
    set_remove_successful_context,
    redirect('/')
)

module.exports = router