const default_api_middleware = (validate_request, call, process, produce_error, process_error) => async (req, res) => {
    let validated_req
    try { validated_req = await validate(req) } catch (error) { return produce_error(error) }

    const result = await call(validated_req)

    let processed // = res.status(...).json ()
    try { processed = await process(result) } catch (error) { return process_error(error) }
    return processed
    return res.status(200).json({})
}