const express = require('express')
const router = express.Router()

const check_authenticated = require('../middlewares/common/check_authenticated')

const get_rating_pictures = require('../middlewares/rating_pictures/get_rating_pictures')
const send_rating_picture = require('../middlewares/rating_pictures/send_rating_picture')


router.get('/',
    check_authenticated,
    get_rating_pictures,
    send_rating_picture
)

module.exports = router