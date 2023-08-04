const client_origin = process.env.NODE_ENV === 'production' ?
    `${process.env.CLIENT_URL_SCHEME}://${process.env.CLIENT_URL_HOST}`
    :
    `${process.env.CLIENT_URL_SCHEME}://${process.env.CLIENT_URL_HOST}:${process.env.CLIENT_URL_PORT}`

const cors_config = {
    credentials: true,
    origin: client_origin
}

module.exports = cors_config