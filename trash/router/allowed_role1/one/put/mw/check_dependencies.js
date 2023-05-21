module.exports = async function (req, res, next) {
    try {
        console.log('mw:check_dependencies(product/one/put/mw/check_dependencies)')
        // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
        // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

        // can not change to an email that is already present.
        const Allowed_Judge_Model = require('../../../../../../../models/Allowed_Role')
        if ('email' in req.body && await Allowed_Judge_Model.exists({
            email: req.body.email
        })) return res.sendStatus(409)

        return next()
    } catch (err) {
        return next(err)
    }
}
