const find_one_document = async (model, filter, session) => {

    const document = await model.findOne(filter, { session: session })

    try {
        await validator.validateAsync(document)
    } catch (error) {
        return { code: 422, json: error.details }
    }

    return document
}

module.exports = find_one_document