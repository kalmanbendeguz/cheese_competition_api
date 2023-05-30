const mongoose = require('mongoose')

const db_url = process.env.DATABASE_URL || 'mongodb://localhost/sajt'

const mongoose_options = {
    bufferCommands: true,
    //user: process.env.DATABASE_USER,
    //pass: process.env.DATABASE_PASSWORD,
    autoIndex: true,
    dbName: process.env.DB_NAME,
    autoCreate: true,

    // connectTimeoutMS // could be useful, see docs (ne kelljen annyit várni a hibára indításkor)
    // maxPoolSize:  // could be useful, see docs
    // minPoolSize:  // could be useful, see docs
    // socketTimeoutMS // could be useful, see docs
    // authSource // could be useful, see docs
    // serverSelectionTimeoutMS // could be useful, see docs
    // heartbeatFrequencyMS // could be useful, see docs
    // keepAlive: true, // could be useful, see docs (true by default)
    // keepAliveInitialDelay: 300000 // could be useful, see docs
    // ssl: true // default false if mongodb://, default true if mongodb+srv://
    // sslValidate: true // true by default if ssl=true
    // sslCA: `${__dirname}/rootCA.pem` // only matters if ssl and sslValidate are both true
    // authMechanism: 'MONGODB-X509' // no need 99%
}

let connection

//async () => {

try {
    connection = /*await*/ mongoose.connect(db_url, mongoose_options)
} catch (error) {
    console.error('Error connecting to database:', error)
}

mongoose.connection.on('error', (err) => {
    // TODO
})

mongoose.connection.on('connected', () => {
    console.log('Connected to database')
    // TODO
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from database')
    // TODO
})

mongoose.connection.on('connecting', () => {
    console.log('Connecting to database')
    // TODO
})

mongoose.connection.on('open', () => {
    console.log('All models of database are `open` (?)')
    // TODO
})

mongoose.connection.on('close', () => {
    console.log('`Connection.close()` successfully closed the connection')
    // TODO
})

mongoose.connection.on('reconnected', () => {
    console.log('Successfully reconnected to database')
    // TODO
})

module.exports = mongoose
