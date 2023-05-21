const express = require('express')
const router = express.Router()


const post = require('./post')
router.post('/', post)

const get = require('./get')
router.get('/', get)

const put = require('./put')
router.put('/', put)

const del = require('./del')
router.delete('/', del)



//// /o router
//const one = require('./one')
//router.use('/o', one)
//
//// /m router
//const many = require('./many')
//router.use('/m', many)


module.exports = router

