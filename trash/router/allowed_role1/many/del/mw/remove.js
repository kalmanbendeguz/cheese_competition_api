module.exports = async function (req, res, next) {
    try {
        console.log('mw:remove(product/many/del/mw/remove)')

        const ids_to_delete = res.locals.allowed_judges.map(allowed_judge => allowed_judge._id)

        const Allowed_Judge_Model = require('../../../../../../../models/Allowed_Role')

        await Allowed_Judge_Model.deleteMany({
            _id: { $in: ids_to_delete }
        })

        return next()
    } catch (err) {
        return next(err)
    }
}
