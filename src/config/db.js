const mongoose = require('mongoose')

const db_url = `${process.env.DB_URI_SCHEME}://${process.env.DB_URI_HOST}/${process.env.DB_URI_NAME}?${process.env.DB_URI_QUERY}`

const db_auth =
    process.env._DB_URI_USERNAME !== '' && process.env._DB_URI_PASSWORD !== ''
        ?
        {
            username: process.env._DB_URI_USERNAME,
            password: process.env._DB_URI_PASSWORD
        }
        :
        undefined

const mongoose_connect_options = {
    bufferCommands: true,
    auth: db_auth,
    autoIndex: true,
    autoCreate: true,
    //replicaSet: 'rs'
}

let connection

try {
    connection = /*await*/ mongoose.connect(db_url, mongoose_connect_options)
    // await would be better but this is the top level of the module so there is the usual problem ...
} catch (error) {
    console.error('Error connecting to database:', error)
}

// TODO: mongoose connection event handlers ("mongoose.connection.on('event') ...")

module.exports = mongoose