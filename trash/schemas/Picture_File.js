const { Schema } = require('mongoose')

const Picture_File_Schema = new Schema({
    file_name: {
        type: String,
    },
    encoding: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    buffer: {
        type: Buffer,
    },
    size: {
        type: Number,
    }
}, {
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})


// DOCUMENT MIDDLEWARES
Picture_File_Schema.pre('validate', { document: true, query: false }, function (next) {console.log(`D_Picture_File_Schema.pre('validate') { document: true, query: false }`);return next()})
Picture_File_Schema.post('validate', { document: true, query: false }, function (doc) {console.log(`D_Picture_File_Schema.post('validate') { document: true, query: false }`)})
Picture_File_Schema.pre('save', { document: true, query: false }, function (next) {console.log(`D_Picture_File_Schema.pre('save') { document: true, query: false }`);return next()})
Picture_File_Schema.post('save', { document: true, query: false }, function (doc) {console.log(`D_Picture_File_Schema.post('save') { document: true, query: false }`)})
Picture_File_Schema.pre('remove', { document: true, query: false }, function (next) {console.log(`D_Picture_File_Schema.pre('remove') { document: true, query: false }`);return next()})
Picture_File_Schema.post('remove', { document: true, query: false }, function (doc) {console.log(`D_Picture_File_Schema.post('remove') { document: true, query: false }`)})
Picture_File_Schema.pre('updateOne', { document: true, query: false }, function (next) {console.log(`D_Picture_File_Schema.pre('updateOne') { document: true, query: false }`);return next()})
Picture_File_Schema.post('updateOne', { document: true, query: false }, function (doc) {console.log(`D_Picture_File_Schema.post('updateOne') { document: true, query: false }`)})
Picture_File_Schema.pre('deleteOne', { document: true, query: false }, function (next) {console.log(`D_Picture_File_Schema.pre('deleteOne') { document: true, query: false }`);return next()})
Picture_File_Schema.post('deleteOne', { document: true, query: false }, function (doc) {console.log(`D_Picture_File_Schema.post('deleteOne') { document: true, query: false }`)})
Picture_File_Schema.pre('init', function (doc) {console.log(`D_Picture_File_Schema.pre('init')`)})
Picture_File_Schema.post('init', function (doc) {console.log(`D_Picture_File_Schema.post('init')`)})

// QUERY MIDDLEWARES
Picture_File_Schema.pre('count', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('count' { document: false, query: true }`);return next()})
Picture_File_Schema.post('count', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('count' { document: false, query: true }`)})
Picture_File_Schema.pre('countDocuments', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('countDocuments' { document: false, query: true }`);return next()})
Picture_File_Schema.post('countDocuments', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('countDocuments' { document: false, query: true }`)})
Picture_File_Schema.pre('deleteMany', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('deleteMany' { document: false, query: true }`);return next()})
Picture_File_Schema.post('deleteMany', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('deleteMany' { document: false, query: true }`)})
Picture_File_Schema.pre('deleteOne', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('deleteOne' { document: false, query: true }`);return next()})
Picture_File_Schema.post('deleteOne', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('deleteOne' { document: false, query: true }`)})
Picture_File_Schema.pre('estimatedDocumentCount', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('estimatedDocumentCount' { document: false, query: true }`);return next()})
Picture_File_Schema.post('estimatedDocumentCount', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('estimatedDocumentCount' { document: false, query: true }`)})
Picture_File_Schema.pre('find', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('find' { document: false, query: true }`);return next()})
Picture_File_Schema.post('find', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('find' { document: false, query: true }`)})
Picture_File_Schema.pre('findOne', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('findOne' { document: false, query: true }`);return next()})
Picture_File_Schema.post('findOne', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('findOne' { document: false, query: true }`)})
Picture_File_Schema.pre('findOneAndDelete', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('findOneAndDelete' { document: false, query: true }`);return next()})
Picture_File_Schema.post('findOneAndDelete', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('findOneAndDelete' { document: false, query: true }`)})
Picture_File_Schema.pre('findOneAndRemove', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('findOneAndRemove' { document: false, query: true }`);return next()})
Picture_File_Schema.post('findOneAndRemove', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('findOneAndRemove' { document: false, query: true }`)})
Picture_File_Schema.pre('findOneAndReplace', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('findOneAndReplace' { document: false, query: true }`);return next()})
Picture_File_Schema.post('findOneAndReplace', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('findOneAndReplace' { document: false, query: true }`)})
Picture_File_Schema.pre('findOneAndUpdate', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('findOneAndUpdate' { document: false, query: true }`);return next()})
Picture_File_Schema.post('findOneAndUpdate', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('findOneAndUpdate' { document: false, query: true }`)})
Picture_File_Schema.pre('remove', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('remove' { document: false, query: true }`);return next()})
Picture_File_Schema.post('remove', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('remove' { document: false, query: true }`)})
Picture_File_Schema.pre('replaceOne', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('replaceOne' { document: false, query: true }`);return next()})
Picture_File_Schema.post('replaceOne', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('replaceOne' { document: false, query: true }`)})
Picture_File_Schema.pre('update', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('update' { document: false, query: true }`);return next()})
Picture_File_Schema.post('update', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('update' { document: false, query: true }`)})
Picture_File_Schema.pre('updateOne', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('updateOne' { document: false, query: true }`);return next()})
Picture_File_Schema.post('updateOne', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('updateOne' { document: false, query: true }`)})
Picture_File_Schema.pre('updateMany', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('updateMany' { document: false, query: true }`);return next()})
Picture_File_Schema.post('updateMany', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('updateMany' { document: false, query: true }`)})
Picture_File_Schema.pre('validate', { document: false, query: true }, function (next) {console.log(`Q_Picture_File_Schema.pre('validate' { document: false, query: true }`);return next()})
Picture_File_Schema.post('validate', { document: false, query: true }, function (doc) {console.log(`Q_Picture_File_Schema.post('validate' { document: false, query: true }`)})

// AGGREGATE MIDDLEWARES
Picture_File_Schema.pre('aggregate', function (next) {console.log(`A_Picture_File_Schema.pre('aggregate')`);return next()})
Picture_File_Schema.post('aggregate', function (doc) {console.log(`A_Picture_File_Schema.post('aggregate')`)})

// MODEL MIDDLEWARES
Picture_File_Schema.pre('insertMany', function (next) {console.log(`M_Picture_File_Schema.pre('insertMany')`);return next()})
Picture_File_Schema.post('insertMany', function (doc) {console.log(`M_Picture_File_Schema.post('insertMany')`)})


module.exports = Picture_File_Schema