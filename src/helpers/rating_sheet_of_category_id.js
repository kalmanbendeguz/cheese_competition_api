const rating_sheet_of_category_id = (product_category_id) => {
    const rating_sheet_map = require('../static/rating_sheet_map.json')
    // We suppose product_category_id is in the right format.

    let rating_sheet
    let number_of_nodes

    do {
        rating_sheet = rating_sheet_map[product_category_id]

        number_of_nodes = product_category_id.split('_').length - 1 !== 2
            ? product_category_id.split('_').length - 1
            : product_category_id[0] === '_'
                ? 1
                : 2

        if (number_of_nodes === 1) {
            return rating_sheet // This can return undefined but that's OK.
        } else if (number_of_nodes === 2) {
            const last_double_underscore_index = product_category_id.lastIndexOf('__')
            product_category_id = product_category_id.substring(last_double_underscore_index)
        } else {
            const last_double_underscore_index = product_category_id.lastIndexOf('__')
            product_category_id = product_category_id.substring(0, last_double_underscore_index)
            const last_underscore_index = product_category_id.lastIndexOf('_')
            product_category_id = product_category_id.slice(0, last_underscore_index) + '_' + product_category_id.slice(last_underscore_index)
        }

    } while (typeof rating_sheet === 'undefined')

    return rating_sheet
}

module.exports = rating_sheet_of_category_id