module.exports = async function (req, res, next) {
    try {
        console.log('mw:check_dependencies(product/one/post/mw/check_dependencies)')
        // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
        // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

        // if it already exists, we cant post it
        const Allowed_Judge_Model = require('../../../../../../../models/Allowed_Role')
        if (await Allowed_Judge_Model.exists({
            email: req.body.email
        })) return res.sendStatus(409)

        return next()
    } catch (err) {
        return next(err)
    }
}
