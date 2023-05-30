if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = require('./router')

const application_name = process.env.APPLICATION_NAME || 'competition'
const db_url = process.env.DATABASE_URL || 'mongodb://localhost/sajt'
const server_url = process.env.SERVER_URL || `http://localhost:3000`
const node_env = process.env.NODE_ENV || `development`
const server_port = process.env.SERVER_PORT || 3000

const app = express()

app.use(router)

console.log(`APPLICATION_NAME: ${application_name}`)
console.log(`NODE_ENV: ${node_env}`)
console.log(`SERVER_URL: ${server_url}`)
console.log(`SERVER_PORT: ${server_port}`)
console.log(`DB_URL: ${db_url}`)

app.listen(server_port, () => {
    console.log(`"${application_name}" app listening on port: ${server_port}`)
})
