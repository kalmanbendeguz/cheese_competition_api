const express_session = require('express-session')
const MongoStore = require('connect-mongo')
const db = require('../../../config/db')

const clientPromise = new Promise((resolve, reject) => {
    const client = db.connection.getClient() // Assuming this method returns MongoClient

    if (client) {
        resolve(client)
    } else {
        reject(new Error('MongoClient instance not found.'))
    }
})

const session_store = MongoStore.create({
    clientPromise: clientPromise,
    touchAfter: 60 * 60 * 24, // seconds
})

const session = express_session({
    secret: process.env._COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: session_store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // milliseconds
    },
    name: `${process.env.APPLICATION_NAME}.connect.sid`,
})

module.exports = session