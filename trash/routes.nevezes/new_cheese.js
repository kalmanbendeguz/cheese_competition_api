const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const check_entry_opened = require('../middlewares/common/check_entry_opened')
const get_session_context = require('../middlewares/common/get_session_context')
const render = require('../middlewares/common/render')
const validate_new_cheese = require('../middlewares/common/validate_new_cheese')

const generate_confirm_cheese_id = require('../middlewares/new_cheese/generate_confirm_cheese_id')
const load_product_tree = require('../middlewares/new_cheese/load_product_tree')
const redirect_to_confirm_cheese = require('../middlewares/new_cheese/redirect_to_confirm_cheese')
const save_temporary_cheese = require('../middlewares/new_cheese/save_temporary_cheese')

router.get('/',
    check_authenticated,
    get_session_context,
    check_entry_opened,
    load_product_tree,
    render('new_cheese')
)

router.post('/',
    check_authenticated,
    check_entry_opened,
    validate_new_cheese,
    generate_confirm_cheese_id,
    save_temporary_cheese,
    redirect_to_confirm_cheese
)

module.exports = router