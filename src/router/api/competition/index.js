const express = require('express')
const router = express.Router()

const create = require('../../../controllers/competition/create')
//const find = require('../../../controllers/competition/find')
//const update = require('../../../controllers/competition/update')
//const remove = require('../../../controllers/competition/remove')

router.post('/', async (req, res, _) => {
    const result = await create(req.body, req.user)
    return res.status(result.code).json(result.data)
})

//router.get('/', async (req, res, _) => {
//    const result = await find(req.query, req.user)
//    return res.status(result.code).json(result.data)
//})

//router.put('/', async (req, res, _) => {
//    const result = await update({ query: req.query, body: req.body }, req.user)
//    return res.status(result.code).json(result.data)
//})
//
//router.delete('/', async (req, res, _) => {
//    const result = await remove(req.query, req.user)
//    return res.status(result.code).json(result.data)
//})

module.exports = router
