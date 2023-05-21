const modify_cheese = function() {

    return function(req, res, next) {
        console.log('modify_cheese')

        delete res.locals.cheese.product_name
        delete res.locals.cheese.factory_name
        delete res.locals.cheese.maturation_time_type
        delete res.locals.cheese.maturation_time_quantity
        delete res.locals.cheese.maturation_time_unit
        delete res.locals.cheese.milk_type
        delete res.locals.cheese.product_category_list
        delete res.locals.cheese.product_description

        let _cheese = req.body
        delete _cheese.public_id
        _cheese.product_category_list = res.locals.category_array

        res.locals.cheese = Object.assign(res.locals.cheese, _cheese)

        return next()

    }
}

module.exports = modify_cheese