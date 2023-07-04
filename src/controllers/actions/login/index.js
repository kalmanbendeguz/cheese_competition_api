const login = async (req, res, next) => {

    // validate ((?))
    // authorize
    // start session and transaction, then at the end close it
    
    // validate request, but only the parts that create_user doesnt validate, like Password
    // 1. Validate ******
    //const registration_validator = require('../../../validators/requests/api/registration')
    //try {
    //    await registration_validator.validateAsync(req)
    //} catch (err) {
    //    return res.status(400).json(`registration_validation_error: ${err.details}`)
    //}
    
    //    const authorize_action = require('../../helpers/authorize_action')
    //
    //try {
    //    authorize_action('login', user)
    //} catch (reason) {
    //    return {
    //        code: 403,
    //        data: reason
    //    }
    //}

    const passport = require('../../../config/passport')
    passport.authenticate('local', function (err, user, info) {
        console.log('user',user)
        if (err) { return next(err) }
        if (!user) { return res.status(200).json({ data: 'failed_login' }) }
        console.log('-----')

        //console.log(err)
        //console.log(user)
        //console.log(info)
        console.log('-----')
        req.login(user, function (err) {
            if (err) { throw err; }
            // session saved
            console.log(req.cookies)
            console.log(res.cookies)
            console.log(req.session)
            console.log(req.session.cookie)
            console.log(req.session.cookies)
            return res.status(200).json({ data: 'successful_login' })
        })

    })(req, res, next);

    ///console.log(result)
    //console.log(req.cookies)
    //console.log(res.cookies)
    //console.log(req.session)
    //console.log(res.session)
    //return res.status(200).json({ data: 'SUCCESS' })


    //// start session and transaction
    //const db = require('../../../config/db')
    //const session = await db.startSession()
    //if (!session.inTransaction()) session.startTransaction()
    //
    //// hash password
    //const bcrypt = require('bcrypt')
    //const salt = await bcrypt.genSalt()
    //const hashed_password = await bcrypt.hash(req.body.password, salt)
    //req.body.hashed_password = hashed_password
    //delete req.body.password
    //
    //console.log(req.body)
    //
    //// create user
    //const create_user = require('../../entities/user/create')
    //const create_user_result = await create_user(req.body, { role: 'SERVER' }, session)
    //if (create_user_result.code !== 201) {
    //    if (session.inTransaction()) await session.abortTransaction()
    //    await session.endSession()
    //    return res.status(create_user_result.code).json(create_user_result.data)
    //}
    //// find user
    //const find_user = require('../../entities/user/find')
    //const find_user_result = await find_user(
    //    { filter: { email: req.body.email }, projection: { confirm_registration_id: 1 } },
    //    { role: 'SERVER' },
    //    session
    //)
    //const created_user = find_user_result.data[0]
    //
    //console.log(find_user_result)
    //// send email
    //const iso_639_1_language = 'hu' // TODO: DETECT THIS AUTOMATICALLY!
    //const recipient = req.body.email
    //const get_string = require('../../../helpers/get_string')
    //const title = get_string('confirm_registration_email_title', iso_639_1_language, null)
    //const server_url = process.env.NODE_ENV === 'production' ?
    //    `${process.env.SERVER_URL_SCHEME}://${process.env.SERVER_URL_HOST}`
    //    :
    //    `${process.env.SERVER_URL_SCHEME}://${process.env.SERVER_URL_HOST}:${process.env.SERVER_URL_PORT}`
    //const html_parameters = {
    //    server_url: server_url,
    //    confirm_registration_id: created_user.confirm_registration_id
    //}
    //const html = get_string('confirm_registration_email_content', iso_639_1_language, html_parameters)
    //
    //const send_email = require('../../../helpers/send_email')
    //try { await send_email(recipient, title, html) } catch (error) {
    //    if (session.inTransaction()) await session.abortTransaction()
    //    await session.endSession()
    //    return next(error)
    //}
    //
    //// end session and transaction
    //// 11. Commit transaction and end session.
    //if (session.inTransaction()) await session.commitTransaction()
    //await session.endSession()
    //
    //// reply
    //return res.status(200).json(`successful_registration`)
}

module.exports = login