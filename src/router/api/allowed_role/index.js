const express = require('express')
const router = express.Router()

const create = require('../../../controllers/allowed_role/create')
//const find = require('../../../controllers/allowed_role/find')
const update = require('../../../controllers/allowed_role/update')
const remove = require('../../../controllers/allowed_role/remove')

router.post('/', async (req, res, _) => {
    const result = await create(req.body, req.user)
    return res.status(result.code).json(result.data) 
})

// WILL ONLY BE USED INTERNALLY
/////////////////////
//router.get('/', async (req, res, _) => {
//    const result = await find(req.query, req.user)
//    return res.status(result.code).json(result.data)
//})
////////////////

router.put('/', async (req, res, _) => {
    const result = await update({ query: req.query, body: req.body }, req.user)
    return res.status(result.code).json(result.data)
})

router.delete('/', async (req, res, _) => {
    const result = await remove(req.query, req.user)
    return res.status(result.code).json(result.data)
})

module.exports = router