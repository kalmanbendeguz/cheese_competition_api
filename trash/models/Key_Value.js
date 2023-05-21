const { Schema: Schema, Schema: { Types: { Mixed } } } = require('mongoose')
const db = require('../config/db')

const Key_Value_Schema = new Schema({
    key: {
        type: String,
        unique: true,
    },
    value: {
        type: Mixed,
    }
}, {
    timestamps: true,
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})


// DOCUMENT MIDDLEWARES
Key_Value_Schema.pre('validate', { document: true, query: false }, function (next) {console.log(`D_Key_Value_Schema.pre('validate') { document: true, query: false }`);return next()})
Key_Value_Schema.post('validate', { document: true, query: false }, function (doc) {console.log(`D_Key_Value_Schema.post('validate') { document: true, query: false }`)})
Key_Value_Schema.pre('save', { document: true, query: false }, function (next) {console.log(`D_Key_Value_Schema.pre('save') { document: true, query: false }`);return next()})
Key_Value_Schema.post('save', { document: true, query: false }, function (doc) {console.log(`D_Key_Value_Schema.post('save') { document: true, query: false }`)})
Key_Value_Schema.pre('remove', { document: true, query: false }, function (next) {console.log(`D_Key_Value_Schema.pre('remove') { document: true, query: false }`);return next()})
Key_Value_Schema.post('remove', { document: true, query: false }, function (doc) {console.log(`D_Key_Value_Schema.post('remove') { document: true, query: false }`)})
Key_Value_Schema.pre('updateOne', { document: true, query: false }, function (next) {console.log(`D_Key_Value_Schema.pre('updateOne') { document: true, query: false }`);return next()})
Key_Value_Schema.post('updateOne', { document: true, query: false }, function (doc) {console.log(`D_Key_Value_Schema.post('updateOne') { document: true, query: false }`)})
Key_Value_Schema.pre('deleteOne', { document: true, query: false }, function (next) {console.log(`D_Key_Value_Schema.pre('deleteOne') { document: true, query: false }`);return next()})
Key_Value_Schema.post('deleteOne', { document: true, query: false }, function (doc) {console.log(`D_Key_Value_Schema.post('deleteOne') { document: true, query: false }`)})
Key_Value_Schema.pre('init', function (doc) {console.log(`D_Key_Value_Schema.pre('init')`)})
Key_Value_Schema.post('init', function (doc) {console.log(`D_Key_Value_Schema.post('init')`)})

// QUERY MIDDLEWARES
Key_Value_Schema.pre('count', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('count' { document: false, query: true }`);return next()})
Key_Value_Schema.post('count', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('count' { document: false, query: true }`)})
Key_Value_Schema.pre('countDocuments', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('countDocuments' { document: false, query: true }`);return next()})
Key_Value_Schema.post('countDocuments', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('countDocuments' { document: false, query: true }`)})
Key_Value_Schema.pre('deleteMany', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('deleteMany' { document: false, query: true }`);return next()})
Key_Value_Schema.post('deleteMany', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('deleteMany' { document: false, query: true }`)})
Key_Value_Schema.pre('deleteOne', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('deleteOne' { document: false, query: true }`);return next()})
Key_Value_Schema.post('deleteOne', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('deleteOne' { document: false, query: true }`)})
Key_Value_Schema.pre('estimatedDocumentCount', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('estimatedDocumentCount' { document: false, query: true }`);return next()})
Key_Value_Schema.post('estimatedDocumentCount', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('estimatedDocumentCount' { document: false, query: true }`)})
Key_Value_Schema.pre('find', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('find' { document: false, query: true }`);return next()})
Key_Value_Schema.post('find', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('find' { document: false, query: true }`)})
Key_Value_Schema.pre('findOne', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('findOne' { document: false, query: true }`);return next()})
Key_Value_Schema.post('findOne', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('findOne' { document: false, query: true }`)})
Key_Value_Schema.pre('findOneAndDelete', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('findOneAndDelete' { document: false, query: true }`);return next()})
Key_Value_Schema.post('findOneAndDelete', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('findOneAndDelete' { document: false, query: true }`)})
Key_Value_Schema.pre('findOneAndRemove', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('findOneAndRemove' { document: false, query: true }`);return next()})
Key_Value_Schema.post('findOneAndRemove', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('findOneAndRemove' { document: false, query: true }`)})
Key_Value_Schema.pre('findOneAndReplace', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('findOneAndReplace' { document: false, query: true }`);return next()})
Key_Value_Schema.post('findOneAndReplace', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('findOneAndReplace' { document: false, query: true }`)})
Key_Value_Schema.pre('findOneAndUpdate', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('findOneAndUpdate' { document: false, query: true }`);return next()})
Key_Value_Schema.post('findOneAndUpdate', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('findOneAndUpdate' { document: false, query: true }`)})
Key_Value_Schema.pre('remove', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('remove' { document: false, query: true }`);return next()})
Key_Value_Schema.post('remove', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('remove' { document: false, query: true }`)})
Key_Value_Schema.pre('replaceOne', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('replaceOne' { document: false, query: true }`);return next()})
Key_Value_Schema.post('replaceOne', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('replaceOne' { document: false, query: true }`)})
Key_Value_Schema.pre('update', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('update' { document: false, query: true }`);return next()})
Key_Value_Schema.post('update', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('update' { document: false, query: true }`)})
Key_Value_Schema.pre('updateOne', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('updateOne' { document: false, query: true }`);return next()})
Key_Value_Schema.post('updateOne', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('updateOne' { document: false, query: true }`)})
Key_Value_Schema.pre('updateMany', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('updateMany' { document: false, query: true }`);return next()})
Key_Value_Schema.post('updateMany', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('updateMany' { document: false, query: true }`)})
Key_Value_Schema.pre('validate', { document: false, query: true }, function (next) {console.log(`Q_Key_Value_Schema.pre('validate' { document: false, query: true }`);return next()})
Key_Value_Schema.post('validate', { document: false, query: true }, function (doc) {console.log(`Q_Key_Value_Schema.post('validate' { document: false, query: true }`)})

// AGGREGATE MIDDLEWARES
Key_Value_Schema.pre('aggregate', function (next) {console.log(`A_Key_Value_Schema.pre('aggregate')`);return next()})
Key_Value_Schema.post('aggregate', function (doc) {console.log(`A_Key_Value_Schema.post('aggregate')`)})

// MODEL MIDDLEWARES
Key_Value_Schema.pre('insertMany', function (next) {console.log(`M_Key_Value_Schema.pre('insertMany')`);return next()})
Key_Value_Schema.post('insertMany', function (doc) {console.log(`M_Key_Value_Schema.post('insertMany')`)})


module.exports = db.model(
    'Key_Value',
    Key_Value_Schema
)