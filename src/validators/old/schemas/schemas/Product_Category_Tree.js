const config = require('../../../config/schema')
const { Schema: Schema, Schema: { Types: { Mixed }, }, } = require('mongoose')

const Product_Category_Tree_Schema = new Schema(
    {
        id: {
            type: String,
        },
        children: {
            type: Mixed
        },
    },
    config.schema_options
)

module.exports = Product_Category_Tree_Schema