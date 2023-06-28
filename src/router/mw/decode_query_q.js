const decode_query_q =  async (req, res, next) => {
    const decode_uri_component = (await import('decode-uri-component')).default

    if (typeof req.query.q !== 'string') return next()

    const decoded_q = decode_uri_component(req.query.q)

    req.query = JSON.parse(decoded_q)

    return next()
}

module.exports = decode_query_q