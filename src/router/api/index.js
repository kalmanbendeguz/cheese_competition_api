const express = require('express')

const session = require('./mw/session')
const passport_initialize = require('./mw/passport_initialize')
const passport_authenticate = require('./mw/passport_authenticate')
const validate = require('./mw/validate')
const authorize_endpoint = require('../../middlewares/authorize_endpoint')
const assign_special_role = require('./mw/assign_special_role')

const router = express.Router({
    caseSensitive: true,
    mergeParams: true,
    strict: false,
})

router.use('/',
    session,
    passport_initialize,
    passport_authenticate,
    assign_special_role,
    validate,
    authorize_endpoint,
    (req,res,next) => {console.log('DEBUGapi', req.body, req.user, req.session, req.cookies); return next()}
)

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

const login = require('./login')
router.use('/login', login)

const logout = require('./logout')
router.use('/logout', logout)

const registration = require('./registration')
router.use('/registration', registration)

module.exports = router