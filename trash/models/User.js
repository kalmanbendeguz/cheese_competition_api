const { Schema } = require('mongoose')
const db = require('../config/db')
const Billing_Information_Schema = require('../schemas/Billing_Information')

const User_Schema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    hashed_password: {
        type: String,
    },
    roles: {
        type: [{
            type: String,
        }],
        index: true,
    },
    full_name: {
        type: String,
        index: true,
    },
    contact_phone_number: {
        type: String,
    },
    billing_information: {
        type: Billing_Information_Schema,
    },
    association_member: {
        type: Boolean,
        index: true,
        default: false,
    },
    table_leader: {
        type: Boolean,
        index: true,
        default: false,
    },
    registration_temporary: {
        type: Boolean,
        index: true,
        default: true,
    },
    confirm_registration_id: {
        type: String,
        unique: true,
        // does this expire?
    }
}, {
    timestamps: true,
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true
})


// DOCUMENT MIDDLEWARES
User_Schema.pre('validate', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('validate') { document: true, query: false }`);return next()})
User_Schema.post('validate', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('validate') { document: true, query: false }`)})
User_Schema.pre('save', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('save') { document: true, query: false }`);return next()})
User_Schema.post('save', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('save') { document: true, query: false }`)})
User_Schema.pre('remove', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('remove') { document: true, query: false }`);return next()})
User_Schema.post('remove', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('remove') { document: true, query: false }`)})
User_Schema.pre('updateOne', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('updateOne') { document: true, query: false }`);return next()})
User_Schema.post('updateOne', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('updateOne') { document: true, query: false }`)})
User_Schema.pre('deleteOne', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('deleteOne') { document: true, query: false }`);return next()})
User_Schema.post('deleteOne', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('deleteOne') { document: true, query: false }`)})
User_Schema.pre('init', function (doc) {console.log(`D_User_Schema.pre('init')`)})
User_Schema.post('init', function (doc) {console.log(`D_User_Schema.post('init')`)})

// QUERY MIDDLEWARES
User_Schema.pre('count', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('count' { document: false, query: true }`);return next()})
User_Schema.post('count', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('count' { document: false, query: true }`)})
User_Schema.pre('countDocuments', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('countDocuments' { document: false, query: true }`);return next()})
User_Schema.post('countDocuments', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('countDocuments' { document: false, query: true }`)})
User_Schema.pre('deleteMany', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('deleteMany' { document: false, query: true }`);return next()})
User_Schema.post('deleteMany', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('deleteMany' { document: false, query: true }`)})
User_Schema.pre('deleteOne', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('deleteOne' { document: false, query: true }`);return next()})
User_Schema.post('deleteOne', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('deleteOne' { document: false, query: true }`)})
User_Schema.pre('estimatedDocumentCount', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('estimatedDocumentCount' { document: false, query: true }`);return next()})
User_Schema.post('estimatedDocumentCount', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('estimatedDocumentCount' { document: false, query: true }`)})
User_Schema.pre('find', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('find' { document: false, query: true }`);return next()})
User_Schema.post('find', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('find' { document: false, query: true }`)})
User_Schema.pre('findOne', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('findOne' { document: false, query: true }`);return next()})
User_Schema.post('findOne', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('findOne' { document: false, query: true }`)})
User_Schema.pre('findOneAndDelete', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('findOneAndDelete' { document: false, query: true }`);return next()})
User_Schema.post('findOneAndDelete', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('findOneAndDelete' { document: false, query: true }`)})
User_Schema.pre('findOneAndRemove', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('findOneAndRemove' { document: false, query: true }`);return next()})
User_Schema.post('findOneAndRemove', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('findOneAndRemove' { document: false, query: true }`)})
User_Schema.pre('findOneAndReplace', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('findOneAndReplace' { document: false, query: true }`);return next()})
User_Schema.post('findOneAndReplace', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('findOneAndReplace' { document: false, query: true }`)})
User_Schema.pre('findOneAndUpdate', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('findOneAndUpdate' { document: false, query: true }`);return next()})
User_Schema.post('findOneAndUpdate', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('findOneAndUpdate' { document: false, query: true }`)})
User_Schema.pre('remove', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('remove' { document: false, query: true }`);return next()})
User_Schema.post('remove', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('remove' { document: false, query: true }`)})
User_Schema.pre('replaceOne', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('replaceOne' { document: false, query: true }`);return next()})
User_Schema.post('replaceOne', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('replaceOne' { document: false, query: true }`)})
User_Schema.pre('update', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('update' { document: false, query: true }`);return next()})
User_Schema.post('update', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('update' { document: false, query: true }`)})
User_Schema.pre('updateOne', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('updateOne' { document: false, query: true }`);return next()})
User_Schema.post('updateOne', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('updateOne' { document: false, query: true }`)})
User_Schema.pre('updateMany', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('updateMany' { document: false, query: true }`);return next()})
User_Schema.post('updateMany', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('updateMany' { document: false, query: true }`)})
User_Schema.pre('validate', { document: false, query: true }, function (next) {console.log(`Q_User_Schema.pre('validate' { document: false, query: true }`);return next()})
User_Schema.post('validate', { document: false, query: true }, function (doc) {console.log(`Q_User_Schema.post('validate' { document: false, query: true }`)})

// AGGREGATE MIDDLEWARES
User_Schema.pre('aggregate', function (next) {console.log(`A_User_Schema.pre('aggregate')`);return next()})
User_Schema.post('aggregate', function (doc) {console.log(`A_User_Schema.post('aggregate')`)})

// MODEL MIDDLEWARES
User_Schema.pre('insertMany', function (next) {console.log(`M_User_Schema.pre('insertMany')`);return next()})
User_Schema.post('insertMany', function (doc) {console.log(`M_User_Schema.post('insertMany')`)})


const User_Model = db.model(
    'User',
    User_Schema,
)

module.exports = User_Model