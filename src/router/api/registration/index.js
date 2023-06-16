const express = require('express')
const router = express.Router()

const passport = require('../../../config/passport')

//const create = require('../../../controllers/competition/create')
//const find = require('../../../controllers/competition/find')
//const update = require('../../../controllers/competition/update')
//const remove = require('../../../controllers/competition/remove')

router.post('/',
    async (req, res, next) => {
        console.log(req.body)
        console.log('ITT1')
        return next()
    },
    
    async (req, res, next) => {
        console.log(req.body)
        console.log('ITT')
        await passport.authenticate('local')(req,res,next);
        return res.status(200).json('login_successful')
        //const result = await create(req.body, req.user, null)
        //return res.status(result.code).json(result.data)
    }
)

module.exports = router
