const { Schema: Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const db = require('../config/db')
const Product_Model = require('./Product')
const User_Model = require('./User')
const Rating_Aspect_Schema = require('../schemas/Rating_Aspect')

const Rating_Schema = new Schema({
    product_id: {
        type: ObjectId,
        ref: Product_Model,
        index: true,
    },
    user_id: {
        type: ObjectId,
        ref: User_Model,
        index: true,
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    aspects: {
        type: [{
            type: Rating_Aspect_Schema,
        }],
    },
    overall_impression: {
        type: String,
    },
    table_leader: {
        type: Boolean,
        index: true,
        default: false,
    }
}, {
    timestamps: true,
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})


// DOCUMENT MIDDLEWARES
Rating_Schema.pre('validate', { document: true, query: false }, function (next) {console.log(`D_Rating_Schema.pre('validate') { document: true, query: false }`);return next()})
Rating_Schema.post('validate', { document: true, query: false }, function (doc) {console.log(`D_Rating_Schema.post('validate') { document: true, query: false }`)})
Rating_Schema.pre('save', { document: true, query: false }, function (next) {console.log(`D_Rating_Schema.pre('save') { document: true, query: false }`);return next()})
Rating_Schema.post('save', { document: true, query: false }, function (doc) {console.log(`D_Rating_Schema.post('save') { document: true, query: false }`)})
Rating_Schema.pre('remove', { document: true, query: false }, function (next) {console.log(`D_Rating_Schema.pre('remove') { document: true, query: false }`);return next()})
Rating_Schema.post('remove', { document: true, query: false }, function (doc) {console.log(`D_Rating_Schema.post('remove') { document: true, query: false }`)})
Rating_Schema.pre('updateOne', { document: true, query: false }, function (next) {console.log(`D_Rating_Schema.pre('updateOne') { document: true, query: false }`);return next()})
Rating_Schema.post('updateOne', { document: true, query: false }, function (doc) {console.log(`D_Rating_Schema.post('updateOne') { document: true, query: false }`)})
Rating_Schema.pre('deleteOne', { document: true, query: false }, function (next) {console.log(`D_Rating_Schema.pre('deleteOne') { document: true, query: false }`);return next()})
Rating_Schema.post('deleteOne', { document: true, query: false }, function (doc) {console.log(`D_Rating_Schema.post('deleteOne') { document: true, query: false }`)})
Rating_Schema.pre('init', function (doc) {console.log(`D_Rating_Schema.pre('init')`)})
Rating_Schema.post('init', function (doc) {console.log(`D_Rating_Schema.post('init')`)})

// QUERY MIDDLEWARES
Rating_Schema.pre('count', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('count' { document: false, query: true }`);return next()})
Rating_Schema.post('count', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('count' { document: false, query: true }`)})
Rating_Schema.pre('countDocuments', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('countDocuments' { document: false, query: true }`);return next()})
Rating_Schema.post('countDocuments', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('countDocuments' { document: false, query: true }`)})
Rating_Schema.pre('deleteMany', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('deleteMany' { document: false, query: true }`);return next()})
Rating_Schema.post('deleteMany', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('deleteMany' { document: false, query: true }`)})
Rating_Schema.pre('deleteOne', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('deleteOne' { document: false, query: true }`);return next()})
Rating_Schema.post('deleteOne', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('deleteOne' { document: false, query: true }`)})
Rating_Schema.pre('estimatedDocumentCount', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('estimatedDocumentCount' { document: false, query: true }`);return next()})
Rating_Schema.post('estimatedDocumentCount', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('estimatedDocumentCount' { document: false, query: true }`)})
Rating_Schema.pre('find', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('find' { document: false, query: true }`);return next()})
Rating_Schema.post('find', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('find' { document: false, query: true }`)})
Rating_Schema.pre('findOne', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('findOne' { document: false, query: true }`);return next()})
Rating_Schema.post('findOne', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('findOne' { document: false, query: true }`)})
Rating_Schema.pre('findOneAndDelete', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('findOneAndDelete' { document: false, query: true }`);return next()})
Rating_Schema.post('findOneAndDelete', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('findOneAndDelete' { document: false, query: true }`)})
Rating_Schema.pre('findOneAndRemove', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('findOneAndRemove' { document: false, query: true }`);return next()})
Rating_Schema.post('findOneAndRemove', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('findOneAndRemove' { document: false, query: true }`)})
Rating_Schema.pre('findOneAndReplace', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('findOneAndReplace' { document: false, query: true }`);return next()})
Rating_Schema.post('findOneAndReplace', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('findOneAndReplace' { document: false, query: true }`)})
Rating_Schema.pre('findOneAndUpdate', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('findOneAndUpdate' { document: false, query: true }`);return next()})
Rating_Schema.post('findOneAndUpdate', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('findOneAndUpdate' { document: false, query: true }`)})
Rating_Schema.pre('remove', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('remove' { document: false, query: true }`);return next()})
Rating_Schema.post('remove', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('remove' { document: false, query: true }`)})
Rating_Schema.pre('replaceOne', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('replaceOne' { document: false, query: true }`);return next()})
Rating_Schema.post('replaceOne', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('replaceOne' { document: false, query: true }`)})
Rating_Schema.pre('update', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('update' { document: false, query: true }`);return next()})
Rating_Schema.post('update', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('update' { document: false, query: true }`)})
Rating_Schema.pre('updateOne', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('updateOne' { document: false, query: true }`);return next()})
Rating_Schema.post('updateOne', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('updateOne' { document: false, query: true }`)})
Rating_Schema.pre('updateMany', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('updateMany' { document: false, query: true }`);return next()})
Rating_Schema.post('updateMany', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('updateMany' { document: false, query: true }`)})
Rating_Schema.pre('validate', { document: false, query: true }, function (next) {console.log(`Q_Rating_Schema.pre('validate' { document: false, query: true }`);return next()})
Rating_Schema.post('validate', { document: false, query: true }, function (doc) {console.log(`Q_Rating_Schema.post('validate' { document: false, query: true }`)})

// AGGREGATE MIDDLEWARES
Rating_Schema.pre('aggregate', function (next) {console.log(`A_Rating_Schema.pre('aggregate')`);return next()})
Rating_Schema.post('aggregate', function (doc) {console.log(`A_Rating_Schema.post('aggregate')`)})

// MODEL MIDDLEWARES
Rating_Schema.pre('insertMany', function (next) {console.log(`M_Rating_Schema.pre('insertMany')`);return next()})
Rating_Schema.post('insertMany', function (doc) {console.log(`M_Rating_Schema.post('insertMany')`)})


module.exports = db.model(
    'Rating',
    Rating_Schema,
)