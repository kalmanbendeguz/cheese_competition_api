const client_origin = process.env.NODE_ENV === 'production' ?
`${process.env.CLIENT_URL_SCHEME}://${process.env.CLIENT_URL_HOST}`
:
`${process.env.CLIENT_URL_SCHEME}://${process.env.CLIENT_URL_HOST}:${process.env.CLIENT_URL_PORT}`

module.exports = {
    credentials: true, 
    origin: client_origin
}