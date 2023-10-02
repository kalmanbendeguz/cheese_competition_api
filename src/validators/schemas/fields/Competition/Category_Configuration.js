const Joi = require('joi')
const Product_Category_Tree_Validator = require('./fields/Product_Category_Tree')
const Rating_Map_Validator = require('./fields/Rating_Map')
const Rating_Sheet_Validator = require('./fields/Rating_Sheet')

const category_configuration_validator = (convert) => Joi.object({

    product_category_tree: Product_Category_Tree_Validator(convert).prefs({ convert: convert }).required(),
    rating_map: Rating_Map_Validator(convert).prefs({ convert: convert }).required(),
    rating_sheets: Joi.array()
        .items(Rating_Sheet_Validator(convert))
        .unique((a, b) => a.id === b.id)
        .min(1)
        .prefs({ convert: convert })
        .required(),

})
    .custom((category_configuration) => {
        // rating_sheets should have a matching sheet for each rating_map value.
        const rating_map_sheet_ids = [...new Set(Object.values(category_configuration.rating_map))]
        const rating_sheet_ids = category_configuration.rating_sheets.map(rating_sheet => rating_sheet.id)
        if (rating_map_sheet_ids.some(rating_sheet_id => !rating_sheet_ids.includes(rating_sheet_id))) {
            throw new Error('rating_sheets_does_not_cover_all_rating_map_rating_sheet_ids')
        }
        return category_configuration
    })
    .unknown(true)

module.exports = category_configuration_validator