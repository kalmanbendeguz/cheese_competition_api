Competition_Schema.pre('remove', { document: true },
    async function (next) {
        try {
            const Product_Model = require('./Product')
            await Product_Model.deleteMany({ competition_id: this._id })
            next()
        } catch (error) {
            next(error)
        }
    }
)