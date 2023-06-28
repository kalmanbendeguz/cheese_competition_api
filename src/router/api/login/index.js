const express = require('express')
const router = express.Router()

const login = require('../../../controllers/actions/login')

router.post('/', login)

//const create = require('../../../controllers/entities/competition/create')
//const find = require('../../../controllers/entities/competition/find')
//const update = require('../../../controllers/entities/competition/update')
//const remove = require('../../../controllers/entities/competition/remove')

//router.post('/', login
//    async (req, res, next) => {
//        console.log(req.body)
//        console.log('ITT1')
//        return next()
//    },
//    passport.authenticate('local'),
//    async (req, res, next) => {
//        console.log(req.body)
//        console.log('ITT')
//        //await passport.authenticate('local')(req,res,next);
//        return res.status(200).json('login_successful')
//        //const result = await create(req.body, req.user, null)
//        //return res.status(result.code).json(result.data)
//    }
//)

module.exports = router
