const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const get_session_context = require('../middlewares/common/get_session_context')
const render = require('../middlewares/common/render')

const get_archived_ratings = require('../middlewares/archive/get_archived_ratings')

router.get('/',
    check_authenticated,
    get_session_context,
    get_archived_ratings,
    render('archive')
)

module.exports = router