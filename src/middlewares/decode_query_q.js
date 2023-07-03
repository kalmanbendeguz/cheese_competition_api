const decode_query_q = async (req, res, next) => {
    const decode_uri_component = (await import('decode-uri-component')).default

    if (typeof req.query?.q !== 'string') return next()

    const decoded_q = decode_uri_component(req.query.q)

    try {
        const query_object = JSON.parse(decoded_q)
        req.query = query_object
    } catch (err) {
        // If decoded_q is not a valid JSON, then leave the query as it is.
        // We will return next below.
    }

    return next()
}

module.exports = decode_query_q