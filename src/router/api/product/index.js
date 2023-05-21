const express = require('express')
const router = express.Router()

const create = require('../../../controllers/product/create')
//const find = require('../../../controllers/product/find')
//const update = require('../../../controllers/product/update')
//const remove = require('../../../controllers/product/remove')

router.post('/', async (req, res, _) => {
    const result = await create(req.body, req.user)
    return res.status(result.code).json(result.data)
})

//router.get('/', (req, res, _) => {
//    const result = find(req.query, req.user)
//    return res.status(result.code).json(result.data)
//})
//
//router.put('/', (req, res, _) => {
//    const result = update(req.query, req.body, req.user)
//    return res.status(result.code).json(result.data)
//})
//
//router.delete('/', (req, res, _) => {
//    const result = remove(req.query, req.user)
//    return res.status(result.code).json(result.data)
//})

module.exports = router

