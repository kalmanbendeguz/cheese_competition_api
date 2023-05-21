Rating_Schema.pre('remove', { document: true },
    async function (next) {
        try {
            const Rating_Picture_Model = require('./Rating_Picture')
            await Rating_Picture_Model.deleteMany({ rating_id: this._id })
            next()
        } catch (error) {
            next(error)
        }
    }
)