module.exports = async function (req, res, next) {
    try {
        console.log('mw:check_dependencies(product/many/del/mw/check_dependencies)')
        // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE DELETED?
        // ARE ALL THE DEPENDENTS OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE DELETED?


        // we could check if the user's registration is temporary or not
        // but if the reg. is temporary, the user wouldnt even get authenticated,
        // so no need to check this.

        // 1. check if all the products competitions are opened or not archived
        const unique_competition_ids = [...new Set(res.locals.products.map(product => product.competition_id.toString()))]
        const Competition_Model = require('../../../../../../../models/Competition')

        if ((await Competition_Model.countDocuments({
            _id: { $in: unique_competition_ids },
            ...(req.user.role === 'competitor' && { entry_opened: true }),
            ...(req.user.role === 'organizer' && { archived: false }),
        })) !== unique_competition_ids.length) return res.sendStatus(403)

        //its not possible to remove a paid product. if any fails, all fails.
        if (res.locals.products.some(product => product.approval_type === 'payment')) return res.sendStatus(403)

        return next()
    } catch (err) {
        return next(err)
    }
}
