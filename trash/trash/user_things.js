const generate_confirm_registration_id = async function () {
    let confirm_registration_id

    const randomstring = require('randomstring')
    do {
        confirm_registration_id = randomstring.generate({
            length: 32,
            charset: 'alphanumeric',
            capitalization: 'lowercase',
        })
    } while (
        await mongoose.model('User').exists({ confirm_registration_id: confirm_registration_id })
    )
    return confirm_registration_id
}

// SHOULD CONSIDER EVERY MIDDLEWARE AND MAKE SURE EVERYTHING RUNS WHEN IT IS NEEDED
// DONT FORGET PRE AND POST MW-S 
// DONT FORGET document: true AND query: true
// PUT THE MW-S IN THE ORDER THEY RUN

// already present:
// User_Schema.pre('validate', { document: true, query: false })
// User_Schema.pre('save', { document: true, query: false })
// User_Schema.pre('deleteOne', { document: true, query: false })

// DOCUMENT MIDDLEWARES
//User_Schema.pre('validate', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('validate') { document: true, query: false }`);return next()})
User_Schema.post('validate', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('validate') { document: true, query: false }`)})
//User_Schema.pre('save', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('save') { document: true, query: false }`);return next()})
User_Schema.post('save', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('save') { document: true, query: false }`)})
User_Schema.pre('remove', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('remove') { document: true, query: false }`);return next()})
User_Schema.post('remove', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('remove') { document: true, query: false }`)})
User_Schema.pre('updateOne', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('updateOne') { document: true, query: false }`);return next()})
User_Schema.post('updateOne', { document: true, query: false }, function (doc) {console.log(`D_User_Schema.post('updateOne') { document: true, query: false }`)})
//User_Schema.pre('deleteOne', { document: true, query: false }, function (next) {console.log(`D_User_Schema.pre('deleteOne') { document: true, query: false }`);return next()})
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

User_Schema.pre('validate', { document: true, query: false },
    async function (next) {
        try {
            console.log(`D_User_Schema.pre('validate') { document: true, query: false }`)

            if (this.registration_temporary && typeof this.confirm_registration_id === 'undefined') {
                this.confirm_registration_id = await generate_confirm_registration_id()
            }

            return next()
        } catch (error) {
            return next(error)
        }
    }
)

User_Schema.pre('save', { document: true, query:false },
    async function (next) {
        try {
            console.log(`D_User_Schema.pre('save') { document: true, query:false }`)
            const validator = require('../validators/schemas/User')

            await validator.validateAsync(this)
            // HOW DO WE HANDLE VALIDATION ERROR?
            return next()
        } catch (error) {
            return next(error)
        }
    }
)

User_Schema.pre('deleteOne', { document: true, query: false },
    async function (next) {
        try {
            console.log(`D_User_Schema.pre('remove') { document: true, query: false }`)

            const Product_Model = require('./Product')
            await Product_Model.deleteMany({ manufacturer_id: this._id })

            const Rating_Model = require('./Rating')
            await Rating_Model.deleteMany({ user_id: this._id })

            const Active_Password_Reset_Model = require('./Active_Password_Reset')
            await Active_Password_Reset_Model.deleteMany({ user_id: this._id })

            return next()
        } catch (error) {
            return next(error)
        }
    }
)
