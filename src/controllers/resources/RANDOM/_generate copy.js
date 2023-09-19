const generate = (construct) => async (dependent_fields, session) => {

    let generated_fields = dependent_fields

    try {
        // competition_id is required
        // product_id is required
        // user_id is required
        // competition__user_id is required
        generated_fields.anonymous ??= false
        // aspects is required
        // overall_impression is required
        generated_fields.weight ??= 1.0
    } catch (error) {
        throw {
            type: 'generate_document_error',
            details: {
                dependent_fields: dependent_fields,
                error: error
            }
        }
    }
    return await construct(generated_fields, session)
}

module.exports = generate