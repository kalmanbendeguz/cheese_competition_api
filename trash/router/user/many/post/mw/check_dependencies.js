module.exports = async function (req, res, next) {
    try {
        console.log('mw:check_dependencies(product/one/post/mw/check_dependencies)')
        // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
        // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

        //are all competitions exists and opened?
        const unique_competition_ids = [...new Set(req.body.map(product => product.competition_id.toString()))]

        const Competition_Model = require('../../../../../../../models/Competition')
        if ((await Competition_Model.countDocuments({
            _id: { $in: unique_competition_ids },
            entry_opened: true
        })) !== unique_competition_ids.length) return res.sendStatus(403)

        // we could check if the user's registration is temporary or not
        // but if the reg. is temporary, the user wouldnt even get authenticated,
        // so no need to check this.

        return next()
    } catch (err) {
        return next(err)
    }
}
