const express = require('express')

const assign_special_role = require('../../middlewares/assign_special_role')
const authorize_endpoint = require('../../middlewares/authorize_endpoint')
const convert_email_to_username = require('../../middlewares/convert_email_to_username')
const passport_authenticate = require('../../middlewares/passport_authenticate')
const passport_initialize = require('../../middlewares/passport_initialize')
const session = require('../../middlewares/session')
const validate_api_endpoint = require('../../middlewares/validate_api_endpoint')

const router = express.Router({
    caseSensitive: true,
    mergeParams: true,
    strict: false,
})

router.use('/',
    session,
    passport_initialize,
    convert_email_to_username,
    passport_authenticate,
    assign_special_role,
    validate_api_endpoint, // this should be at top! or not?
    //(req, res, next) => { console.log(req.session); console.log(req.cookies); return next(); },
    authorize_endpoint,
)

/* 
    Entity routers 
*/

const active_password_reset = require('./active_password_reset')
router.use('/active_password_reset', active_password_reset)

const allowed_role = require('./allowed_role')
router.use('/allowed_role', allowed_role)

const competition = require('./competition')
router.use('/competition', competition)

const entry_fee_payment = require('./entry_fee_payment')
router.use('/entry_fee_payment', entry_fee_payment)

const product = require('./product')
router.use('/product', product)

const rating = require('./rating')
router.use('/rating', rating)

const rating_picture = require('./rating_picture')
router.use('/rating_picture', rating_picture)

const user = require('./user')
router.use('/user', user)


/* 
    Action routers 
*/

const confirm_registration = require('./confirm_registration')
router.use('/confirm_registration', confirm_registration)

const forget_password = require('./forget_password')
router.use('/forget_password', forget_password)

const current_role = require('./current_role')
router.use('/current_role', current_role)

const login = require('./login')
router.use('/login', login)

const logout = require('./logout')
router.use('/logout', logout)

const registration = require('./registration')
router.use('/registration', registration)

module.exports = router