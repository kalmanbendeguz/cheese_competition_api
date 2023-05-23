const express = require('express')

//const passport_initialize = require('./mw/passport_initialize')
//const passport_authenticate = require('./mw/passport_authenticate')
//const check_authenticated = require('./mw/check_authenticated')
//const validate = require('./mw/validate')
const authorize = require('./mw/authorize')

const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const router = express.Router({
    caseSensitive: true,
    mergeParams: true,
    strict: false
})

router.use('/',
    //passport_initialize, // NEEDBACK test
    //passport_authenticate, // NEEDBACK test
    //check_authenticated, // NEEDBACK test
    //validate,
    (req, __, n) => { req.user = { role: 'SERVER' }; n() },
    //(req, __, n) => { req.user = { role: 'competitor', _id: new ObjectId('643c07ff8dc54817a62e692a') }; n() },
    //(req, __, n) => { req.user = { role: 'judge', _id: new ObjectId('643c07ff8dc54817a62e692a') }; n() },
    //(req, __, n) => { req.user = { role: 'organizer', _id: new ObjectId('643c07ff8dc54817a62e692a') }; n() },
    //(req, __, n) => { req.user = { role: 'receiver', _id: new ObjectId('643c07ff8dc54817a62e692a') }; n() },
    (req, __, n) => { if (!('user' in req)) req.user = { role: 'UNAUTHENTICATED' }; n() },
    (req, __, n) => {
       //console.dir('originalUrl|' + req.originalUrl);
       //console.dir('route|' + req.route);
       //console.dir('baseUrl|' + req.baseUrl);
       //console.dir('path|' + req.path);
       //console.dir('method|' + req.method);
       //console.log(`body: [${JSON.stringify(req.body)}]`);
        n()
    },
    authorize,
)

// /a routers
const product = require('./product')
router.use('/product', product)

const active_password_reset = require('./active_password_reset')
router.use('/active_password_reset', active_password_reset)

const entry_fee_payment = require('./entry_fee_payment')
router.use('/entry_fee_payment', entry_fee_payment)

const user = require('./user')
router.use('/user', user)

//const allowed_role = require('./allowed_role')
//router.use('/allowed_role', allowed_role)

module.exports = router