const express = require('express')
const router = express.Router()

const create = require('../../../controllers/entities/allowed_role/create')
const find = require('../../../controllers/entities/allowed_role/find')
const update = require('../../../controllers/entities/allowed_role/update')
const remove = require('../../../controllers/entities/allowed_role/remove')

router.post('/', async (req, res, _) => {
    const result = await create(req.body, req.user, null)
    return res.status(result.code).json(result.data)
})

router.get('/', async (req, res, _) => {
    const result = await find(req.query, req.user, null)
    return res.status(result.code).json(result.data)
})

router.put('/', async (req, res, _) => {
    const result = await update({ query: req.query, body: req.body }, req.user, null)
    return res.status(result.code).json(result.data)
})

router.delete('/', async (req, res, _) => {
    const result = await remove(req.query, req.user, null)
    return res.status(result.code).json(result.data)
})

module.exports = router
