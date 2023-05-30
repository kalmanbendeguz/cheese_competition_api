const {
    Schema: Schema,
    Schema: {
        Types: { ObjectId },
    },
} = require('mongoose')
const db = require('../config/db')
const Rating_Model = require('./Rating')
const File_Schema = require('./schemas/File')

const Rating_Picture_Schema = new Schema(
    {
        rating_id: {
            type: ObjectId,
            ref: Rating_Model,
        },
        picture: {
            type: File_Schema,
        },
    },
    {
        timestamps: true,
        minimize: false,
        strict: true,
        strictQuery: false,
        validateBeforeSave: true,
    }
)

const Rating_Picture_Model = db.model('Rating_Picture', Rating_Picture_Schema)

module.exports = Rating_Picture_Model
