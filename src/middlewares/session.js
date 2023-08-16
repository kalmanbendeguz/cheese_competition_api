const express_session = require('express-session')
const MongoStore = require('connect-mongo')
const db = require('../config/db')

const mongo_client = db.connection.getClient()

const session_store = MongoStore.create({
    touchAfter: 60 * 60 * 24, // seconds
    client: mongo_client,
    collectionName: 'sessions',
    ttl: 1209600,
    stringify: true,
    autoRemove: 'native',
})

const session = express_session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // milliseconds
        httpOnly: true,
        path: '/',
    },
    name: `${process.env.APPLICATION_NAME}.connect.sid`,
    resave: false,
    saveUninitialized: false,
    secret: process.env.__COOKIE_SECRET,
    store: session_store,
})

module.exports = session