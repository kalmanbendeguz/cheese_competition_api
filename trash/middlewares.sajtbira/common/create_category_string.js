const create_category_string = function (req, res, next) {
    try {
        //console.log('create_category_string')

        res.locals.category_string = res.locals.cheese.product_category_list.join('-')

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = create_category_string