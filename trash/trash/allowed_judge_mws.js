
Allowed_Judge_Schema.pre('save', { document: true, query: true }, // query true???
    async function (next) {
        try {
            console.log(`Allowed_Judge_Schema.pre('save')`)
            const validator = require('../validators/schemas/Allowed_Judge')

            const value = await validator.validateAsync(this)

            // HOW DO WE HANDLE VALIDATION ERROR?
            console.log("---")
            console.log(value)
            console.log("---")
            return next()
        } catch (error) {
            console.log('CATCHED ERROR')
            return next(error)
        }
    }
)

Allowed_Judge_Schema.pre('deleteOne', { document: true, query: false },
    async function (next) {
        try {
            console.log(`Allowed_Judge_Schema.pre('deleteOne')`)
            const User_Model = require('./User')
            //console.log(this)

            await User_Model.deleteOne({
                email: this.email,
                roles: { $elemMatch: { $eq: 'judge' } },
                roles: { $size: 1 }
            })

            const was_judge_but_has_other_role = await User_Model.findOneAndUpdate({
                email: this.email,
                roles: { $in: ['judge'] }
            },
            {
                $pull: { roles: 'judge' }
            },
            {
                lean: true
            })

            const Rating_Model = require('./Rating')
            await Rating_Model.deleteMany({ user_id: was_judge_but_has_other_role.id })

            return next()
        } catch (error) {
            return next(error)
        }
    }
)