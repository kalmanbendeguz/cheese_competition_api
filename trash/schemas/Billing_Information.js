const { Schema } = require('mongoose')

const Billing_Information_Schema = new Schema({
    name: {
        type: String,
    },
    tax_number: {
    },
    zip: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    street_type: {
        type: String,
    },
    house_number: {
        type: String,
    },
    address_details: {
        type: String,
    }
}, {
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})


// DOCUMENT MIDDLEWARES
Billing_Information_Schema.pre('validate', { document: true, query: false }, function (next) {console.log(`D_Billing_Information_Schema.pre('validate') { document: true, query: false }`);return next()})
Billing_Information_Schema.post('validate', { document: true, query: false }, function (doc) {console.log(`D_Billing_Information_Schema.post('validate') { document: true, query: false }`)})
Billing_Information_Schema.pre('save', { document: true, query: false }, function (next) {console.log(`D_Billing_Information_Schema.pre('save') { document: true, query: false }`);return next()})
Billing_Information_Schema.post('save', { document: true, query: false }, function (doc) {console.log(`D_Billing_Information_Schema.post('save') { document: true, query: false }`)})
Billing_Information_Schema.pre('remove', { document: true, query: false }, function (next) {console.log(`D_Billing_Information_Schema.pre('remove') { document: true, query: false }`);return next()})
Billing_Information_Schema.post('remove', { document: true, query: false }, function (doc) {console.log(`D_Billing_Information_Schema.post('remove') { document: true, query: false }`)})
Billing_Information_Schema.pre('updateOne', { document: true, query: false }, function (next) {console.log(`D_Billing_Information_Schema.pre('updateOne') { document: true, query: false }`);return next()})
Billing_Information_Schema.post('updateOne', { document: true, query: false }, function (doc) {console.log(`D_Billing_Information_Schema.post('updateOne') { document: true, query: false }`)})
Billing_Information_Schema.pre('deleteOne', { document: true, query: false }, function (next) {console.log(`D_Billing_Information_Schema.pre('deleteOne') { document: true, query: false }`);return next()})
Billing_Information_Schema.post('deleteOne', { document: true, query: false }, function (doc) {console.log(`D_Billing_Information_Schema.post('deleteOne') { document: true, query: false }`)})
Billing_Information_Schema.pre('init', function (doc) {console.log(`D_Billing_Information_Schema.pre('init')`)})
Billing_Information_Schema.post('init', function (doc) {console.log(`D_Billing_Information_Schema.post('init')`)})

// QUERY MIDDLEWARES
Billing_Information_Schema.pre('count', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('count' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('count', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('count' { document: false, query: true }`)})
Billing_Information_Schema.pre('countDocuments', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('countDocuments' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('countDocuments', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('countDocuments' { document: false, query: true }`)})
Billing_Information_Schema.pre('deleteMany', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('deleteMany' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('deleteMany', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('deleteMany' { document: false, query: true }`)})
Billing_Information_Schema.pre('deleteOne', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('deleteOne' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('deleteOne', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('deleteOne' { document: false, query: true }`)})
Billing_Information_Schema.pre('estimatedDocumentCount', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('estimatedDocumentCount' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('estimatedDocumentCount', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('estimatedDocumentCount' { document: false, query: true }`)})
Billing_Information_Schema.pre('find', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('find' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('find', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('find' { document: false, query: true }`)})
Billing_Information_Schema.pre('findOne', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('findOne' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('findOne', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('findOne' { document: false, query: true }`)})
Billing_Information_Schema.pre('findOneAndDelete', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('findOneAndDelete' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('findOneAndDelete', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('findOneAndDelete' { document: false, query: true }`)})
Billing_Information_Schema.pre('findOneAndRemove', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('findOneAndRemove' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('findOneAndRemove', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('findOneAndRemove' { document: false, query: true }`)})
Billing_Information_Schema.pre('findOneAndReplace', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('findOneAndReplace' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('findOneAndReplace', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('findOneAndReplace' { document: false, query: true }`)})
Billing_Information_Schema.pre('findOneAndUpdate', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('findOneAndUpdate' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('findOneAndUpdate', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('findOneAndUpdate' { document: false, query: true }`)})
Billing_Information_Schema.pre('remove', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('remove' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('remove', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('remove' { document: false, query: true }`)})
Billing_Information_Schema.pre('replaceOne', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('replaceOne' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('replaceOne', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('replaceOne' { document: false, query: true }`)})
Billing_Information_Schema.pre('update', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('update' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('update', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('update' { document: false, query: true }`)})
Billing_Information_Schema.pre('updateOne', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('updateOne' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('updateOne', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('updateOne' { document: false, query: true }`)})
Billing_Information_Schema.pre('updateMany', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('updateMany' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('updateMany', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('updateMany' { document: false, query: true }`)})
Billing_Information_Schema.pre('validate', { document: false, query: true }, function (next) {console.log(`Q_Billing_Information_Schema.pre('validate' { document: false, query: true }`);return next()})
Billing_Information_Schema.post('validate', { document: false, query: true }, function (doc) {console.log(`Q_Billing_Information_Schema.post('validate' { document: false, query: true }`)})

// AGGREGATE MIDDLEWARES
Billing_Information_Schema.pre('aggregate', function (next) {console.log(`A_Billing_Information_Schema.pre('aggregate')`);return next()})
Billing_Information_Schema.post('aggregate', function (doc) {console.log(`A_Billing_Information_Schema.post('aggregate')`)})

// MODEL MIDDLEWARES
Billing_Information_Schema.pre('insertMany', function (next) {console.log(`M_Billing_Information_Schema.pre('insertMany')`);return next()})
Billing_Information_Schema.post('insertMany', function (doc) {console.log(`M_Billing_Information_Schema.post('insertMany')`)})


module.exports = Billing_Information_Schema