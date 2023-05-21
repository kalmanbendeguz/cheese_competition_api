const set_association_members = function() {

    return async function(req, res, next) {
        //console.log('set_association_members')

        const User_Model = require('../../config/db').mongoose.connection.db.collection('users')

        const all_users = await User_Model.find().toArray()

        for (let user of all_users) {
            await User_Model.findOneAndUpdate(
                { email: user.email},
                { $set: { association_member: res.locals.association_members.includes(user.email) ? true : false }},
                { upsert: false }
            )
        }

        return next()

    }
}

module.exports = set_association_members