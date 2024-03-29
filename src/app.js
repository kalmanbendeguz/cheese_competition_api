if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = require('./router')

const app = express()

app.use(router)

console.log('ENVIRONMENT VARIABLES (SECRETS ARE FILTERED):')
for (const key in process.env) {
    console.log(`${key}: ${key.startsWith('__') ? '*****' : process.env[key]}`)
}

app.listen(process.env.SERVER_URL_PORT, () => {
    console.log(`"${process.env.APPLICATION_NAME}" app listening on port: ${process.env.SERVER_URL_PORT}`)
})