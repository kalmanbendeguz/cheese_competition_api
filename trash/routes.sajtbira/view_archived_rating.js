const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')
const create_category_string = require('../middlewares/common/create_category_string')
const get_rating_sheet = require('../middlewares/common/get_rating_sheet')
const get_session_context = require('../middlewares/common/get_session_context')
const render = require('../middlewares/common/render')

const check_archived_rating_belongs_to_judge = require('../middlewares/view_archived_rating/check_archived_rating_belongs_to_judge')
const get_archived_cheese_view_archived_rating = require('../middlewares/view_archived_rating/get_archived_cheese_view_archived_rating')
const get_archived_rating = require('../middlewares/view_archived_rating/get_archived_rating')
const get_archived_rating_pictures = require('../middlewares/view_archived_rating/get_archived_rating_pictures')
//const get_table_leader = require('../middlewares/view_archived_rating/get_table_leader')
const validate_view_archived_rating = require('../middlewares/view_archived_rating/validate_view_archived_rating')

router.get('/',
    check_authenticated,
    get_session_context,
    validate_view_archived_rating,
    get_archived_rating,
    get_archived_rating_pictures,
    check_archived_rating_belongs_to_judge,
    get_archived_cheese_view_archived_rating,
    create_category_string,
    get_rating_sheet,
    //get_table_leader,
    render('view_archived_rating')
)

module.exports = router