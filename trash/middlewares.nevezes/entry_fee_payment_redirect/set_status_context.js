const set_status_context = function (req, res, next) {
    try {
        //console.log('set_status_context')

        if(res.locals.payment_status === 'Succeeded'){
            req.app.set_session_context(
                req.session,
                'successes',
                req.app.locals.dict[res.locals.lang].entry_fee_payment_succeeded
            )
            return next()
        }

        if(res.locals.payment_status === 'Canceled'){
            req.app.set_session_context(
                req.session,
                'errors',
                req.app.locals.dict[res.locals.lang].entry_fee_payment_canceled
            )
            return next()
        }

        if(res.locals.payment_status === 'Expired'){
            req.app.set_session_context(
                req.session,
                'errors',
                req.app.locals.dict[res.locals.lang].entry_fee_payment_expired
            )
            return next()
        }

        throw new Error(`${req.app.locals.dict[res.locals.lang].entry_fee_payment_unhandled_status}: ${res.locals.payment_status}`)

    } catch (err) {
        return next(err)
    }
}

module.exports = set_status_context