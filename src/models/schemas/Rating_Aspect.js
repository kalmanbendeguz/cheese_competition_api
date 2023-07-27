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
    {
        minimize: false,
        strict: true,
        strictQuery: false,
        validateBeforeSave: true,
    }
)

module.exports = Rating_Aspect_Schema