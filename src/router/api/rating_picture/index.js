const express = require('express')
const router = express.Router()

const create = require('../../../controllers/entities/rating_picture/create')
const find = require('../../../controllers/entities/rating_picture/find')
const update = require('../../../controllers/entities/rating_picture/update')
const remove = require('../../../controllers/entities/rating_picture/remove')

const multer_to_body_rating_picture = require('../../../middlewares/multer_to_body_rating_picture')

router.post('/',
    multer_to_body_rating_picture,
    async (req, res, _) => {
        const result = await create(req.body, req.user, null)
        return res.status(result.code).json(result.data)
    }
)

router.get('/',
    async (req, res, _) => {
        const result = await find(req.query, req.user, null)
        return res.status(result.code).json(result.data)
    }
)

router.put('/',
    multer_to_body_rating_picture,
    async (req, res, _) => {
        const result = await update({ query: req.query, body: req.body }, req.user, null)
        return res.status(result.code).json(result.data)
    }
)

router.delete('/', async (req, res, _) => {
    const result = await remove(req.query, req.user, null)
    return res.status(result.code).json(result.data)
})

module.exports = router