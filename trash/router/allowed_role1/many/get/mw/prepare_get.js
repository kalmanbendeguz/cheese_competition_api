module.exports = async function (req, res, next) {
    try {
        console.log('mw:prepare(product/many/get/mw/prepare)')

        const email = req.user.role === 'organizer' ? req.query.email : req.user.email

        res.locals.filter = {
            ...(req.query._id && { _id: req.query._id }),
            ...(email && { email: email }),
        }

        res.locals.projection = req.query.projection ?? {}
        for (const key of res.locals.forbidden_projections) {
            res.locals.projection[key] = 0
        }

        const sort = 'sort_by' in req.query
            ?
            req.query.sort_by.reduce((acc, curr) => {
                acc[curr.key] = curr.order === 'asc' ? 1 : -1
                return acc
            }, {})
            :
            undefined

        const page = req.query.page ?? 1
        const page_size = req.query.page_size ?? process.env.DEFAULT_PAGE_SIZE ?? 10
        const pagination = 'page' in req.query || 'page_size' in req.query

        res.locals.options = {
            lean: true,
            ...(sort && { sort: sort }),
            ...(pagination && { skip: (page - 1) * page_size }),
            ...(pagination && { limit: page_size }),
        }

        return next()
    } catch (err) {
        return next(err)
    }
}
