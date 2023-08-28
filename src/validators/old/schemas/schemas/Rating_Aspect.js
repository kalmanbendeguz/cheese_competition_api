const config = require('../../../config/schema')
const { Schema } = require('mongoose')

const Rating_Aspect_Schema = new Schema(
    {
        title: {
            type: String,
        },
        score: {
            type: Number,
        },
        blocks: {
            type: [
                {
                    type: [
                        {
                            type: String,
                        },
                    ],
                },
            ],
        },
        comment: {
            type: String,
        },
    },
    config.schema_options
)

module.exports = Rating_Aspect_Schema