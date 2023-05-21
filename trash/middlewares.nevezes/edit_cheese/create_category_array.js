const create_category_array = function (req, res, next) {
    try {
        //console.log('create_category_array')

        res.locals.category_array =
            req.body.product_category_list.split('-')

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = create_category_array