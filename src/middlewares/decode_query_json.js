const decode_query_json = async (req, res, next) => {
    const decode_uri_component = (await import('decode-uri-component')).default

    if (typeof req.query?.json !== 'string') return next()

    const decoded_json = decode_uri_component(req.query.json)

    try {
        const query_object = JSON.parse(decoded_json)
        req.query = {...query_object, ...req.query} // If conflict, the original query param wins.
    } catch (err) {
        // If decoded_q is not a valid JSON, then leave the query as it is.
        // We will return next below.
    }

    return next()
}

module.exports = decode_query_json