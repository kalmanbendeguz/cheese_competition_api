const express = require('express')
const router = express.Router()

const render_not_found = require('../middlewares/default/render_not_found')
const set_not_found_context = require('../middlewares/default/set_not_found_message')

router.use(
    set_not_found_context,
    render_not_found
)

module.exports = router