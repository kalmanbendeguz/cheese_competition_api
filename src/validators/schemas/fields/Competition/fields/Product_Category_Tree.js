const Joi = require('joi')

const product_category_tree_node_validator = (convert) => Joi.object({
    id: Joi.number()
        .integer()
        .min(0)
        .prefs({ convert: convert })
        .required(),
    children: Joi.array()
        .items(
            Joi.link('...')
        )
        .unique((a, b) => a.id === b.id)
        .min(0)
        .prefs({ convert: convert })
        .required(),
}).unknown(true)

const product_category_tree_validator = (convert) => Joi.object({
    id: Joi.number()
        .integer()
        .valid(0)
        .prefs({ convert: convert })
        .required(),
    children: Joi.array()
        .items(
            product_category_tree_node_validator
        )
        .unique((a, b) => a.id === b.id)
        .min(0)
        .prefs({ convert: convert })
        .required(),
}).unknown(true)

module.exports = product_category_tree_validator