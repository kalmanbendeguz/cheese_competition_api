const Joi = require('joi')
const tree_to_flat_array = require('../../../helpers/tree_to_flat_array')

const product_category_tree_node_validator = Joi.object({
    id: Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^0(?:_[1-9][0-9]*)*$`
            )
        )
        .prefs({ convert: false })
        .required(),
    children: Joi.array()
        .items(
            Joi.link('...')
        )
        .unique((a, b) => a.id === b.id)
        .min(0)
        .required(),
}).unknown(true)

const product_category_tree_validator = Joi.object({
    id: Joi.string()
        .trim()
        .valid('0')
        .prefs({ convert: false })
        .required(),
    children: Joi.array()
        .items(
            product_category_tree_node_validator
        )
        .unique((a, b) => a.id === b.id)
        .min(0)
        .required(),
})
    .custom((product_category_tree, helpers) => {
        const categories = tree_to_flat_array(product_category_tree)
        for(const category of categories) {
            if(category.parent_id !== null && !category.node_id.startsWith(category.parent_id) ) {
                throw new Error('product_category_tree_node_id_does_not_start_with_parent_node_id')
            }
        }
        return product_category_tree
    })
    .unknown(true)

module.exports = product_category_tree_validator