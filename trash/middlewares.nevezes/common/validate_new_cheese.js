const validate_new_cheese = function (req, res, next) {
    try {
        //console.log('validate_new_cheese')

        let problems = []

        if (typeof req.body.product_name === 'undefined') {
            problems.push(req.app.locals.dict[res.locals.lang].product_name_field_missing)
        }
        if (typeof req.body.factory_name === 'undefined') {
            problems.push(req.app.locals.dict[res.locals.lang].factory_name_field_missing)
        }
        if (typeof req.body.maturation_time_type === 'undefined') {
            problems.push(req.app.locals.dict[res.locals.lang].maturation_time_type_missing)
        }
        if (req.body.maturation_time_type === 'matured') {
            if (typeof req.body.maturation_time_quantity === 'undefined') {
                problems.push(req.app.locals.dict[res.locals.lang].maturation_time_quantity_missing)
            }
            if (typeof req.body.maturation_time_unit === 'undefined') {
                problems.push(req.app.locals.dict[res.locals.lang].maturation_time_unit_missing)
            }
        }
        if (typeof req.body.milk_type === 'undefined') {
            problems.push(req.app.locals.dict[res.locals.lang].milk_type_missing)
        }
        if (typeof req.body.product_category_list === 'undefined') {
            problems.push(req.app.locals.dict[res.locals.lang].product_category_list_missing)
        }
        if (typeof req.body.product_description === 'undefined') {
            problems.push(req.app.locals.dict[res.locals.lang].product_description_missing)
        }
        if (req.body.product_name.length < 3) {
            problems.push(req.app.locals.dict[res.locals.lang].product_name_too_short)
        }
        if (req.body.product_name.length > 25) {
            problems.push(req.app.locals.dict[res.locals.lang].product_name_too_long)
        }
        if (req.body.factory_name.length < 3) {
            problems.push(req.app.locals.dict[res.locals.lang].factory_name_too_short)
        }
        if (req.body.factory_name.length > 80) {
            problems.push(req.app.locals.dict[res.locals.lang].factory_name_too_long)
        }
        if (!(req.body.maturation_time_type === 'matured' || req.body.maturation_time_type === 'fresh')) {
            problems.push(req.app.locals.dict[res.locals.lang].invalid_maturation_time_type)
        }
        if (req.body.maturation_time_type === 'matured') {
            if (req.body.maturation_time_quantity < 1) {
                problems.push(req.app.locals.dict[res.locals.lang].maturation_time_quantity_should_be_positive)
            }
            if (!(req.body.maturation_time_unit === 'day' || req.body.maturation_time_unit === 'week' || req.body.maturation_time_unit === 'month')) {
                problems.push(req.app.locals.dict[res.locals.lang].invalid_maturation_time_unit)
            }
        }

        let milk_types = req.app.locals.product_tree.map(milk_type => Object.keys(milk_type)[0])
        if (!milk_types.includes(req.body.milk_type)) {
            problems.push(req.app.locals.dict[res.locals.lang].invalid_milk_type)
        }

        if (req.body.product_category_list.length === 0) {
            problems.push(req.app.locals.dict[res.locals.lang].invalid_category_empty)
        }

        res.locals.category_array = req.body.product_category_list.split('-')
        const top_level = res.locals.category_array[0]
        if (!req.app.locals.product_tree.find(e => Object.keys(e)[0] === top_level)) {
            problems.push(req.app.locals.dict[res.locals.lang].invalid_category_first_node_invalid)
        }

        const bottom_level = res.locals.category_array.at(-1)
        const bottom_categories = bottom_level_primitives(req.app.locals.product_tree, null)
        if (!bottom_categories.includes(bottom_level)) {
            problems.push(req.app.locals.dict[res.locals.lang].invalid_category_last_node_invalid)
        }

        let current_tree_array = req.app.locals.product_tree
        for (let i = 0; i < res.locals.category_array.length; ++i) {
            let sub_tree = current_tree_array.find(e =>
                res.locals.category_array[i] === Object.keys(e)[0]
                ||
                res.locals.category_array[i] === e
            )
            if (typeof sub_tree === 'object') {
                current_tree_array = Object.values(sub_tree)[0]
            } else if (typeof sub_tree === 'string') {
                if (i !== res.locals.category_array.length - 1) {
                    problems.push(req.app.locals.dict[res.locals.lang].invalid_category_lowest_level_category_before_path_ending)
                    break
                }
            } else if (typeof sub_tree === 'undefined') {
                problems.push(req.app.locals.dict[res.locals.lang].invalid_category_split_in_path)
                break
            }
        }

        if (req.body.product_description.length < 25) {
            problems.push(req.app.locals.dict[res.locals.lang].product_description_too_short)
        }

        if (req.body.product_description.length > 1000) {
            problems.push(req.app.locals.dict[res.locals.lang].product_description_too_long)
        }

        if (problems.length === 0) return next()

        for (const problem of problems) {
            req.app.set_session_context(req.session, 'errors', problem)
        }

        return res.redirect('/message_authenticated')
    } catch (err) {
        return next(err)
    }

}

function bottom_level_primitives(object, array_of_primitives) {
    if (!array_of_primitives) array_of_primitives = []
    for (const key in object) {
        if (typeof object[key] === 'object' && object[key] !== null) {
            bottom_level_primitives(object[key], array_of_primitives)
        }
        else {
            array_of_primitives.push(object[key])
        }
    }
    return array_of_primitives
}

module.exports = validate_new_cheese