module.exports = async function (req, res, next) {
    try {
        console.log('mw:check_dependencies(product/one/put/mw/check_dependencies)')
        // ARE ALL THE DEPENDENCIES OF THE OBJECT PRESENT?
        // ARE ALL THE DEPENDENCIES OF THE OBJECT IN A STATE THAT ALLOWS THE DOCUMENT TO BE CREATED?

        // a competitor can only edit if the competition is opened
        // an organizer can only edit if the competition is not archived
        const Competition_Model = require('../../../../../../../models/Competition')

        // this is always the OLD competition
        const old_competition_id = res.locals.product.competition_id 
        if (!(await Competition_Model.exists({
            _id: old_competition_id, // sure it exists
            ...(req.user.role === 'competitor' && { entry_opened: true }),
            ...(req.user.role === 'organizer' && { archived: false }),
        }))) return res.sendStatus(403)

        // this is always the NEW competition
        if ('competition_id' in req.body && !(await Competition_Model.exists({
            _id: req.body.competition_id,
            ...(req.user.role === 'competitor' && { entry_opened: true }),
            ...(req.user.role === 'organizer' && { archived: false }),
        }))) return res.sendStatus(403)

        // we could check if the user's registration is temporary or not
        // but if the reg. is temporary, the user wouldnt even get authenticated,
        // so no need to check this.
        const User_Model = require('../../../../../../../models/User')

        // this is always the NEW manufacturer. we know that the OLD manufacturer is always competitor.
        // he should be a competitor, and his registration should not be temporary!!
        const manufacturer_id = req.body.manufacturer_id ?? res.locals.product.manufacturer_id
        if (!(await User_Model.exists({
            _id: manufacturer_id,
            roles: { $in: ['competitor'] },
            registration_temporary: false
        }))) return res.sendStatus(403)

        // ha a terméket kifizették, ezt a tulajdonságát nem változtathatjuk meg.
        if(res.locals.product.approval_type === 'payment' && req.body.approval_type !== 'payment') return res.sendStatus(403)

        return next()
    } catch (err) {
        return next(err)
    }
}
