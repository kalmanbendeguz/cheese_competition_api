// this is what surely does multiple authorized operations in the database

const attempts = (authorization) => async (body, actor, session) => {

    let array_of_docs
    try {
        array_of_docs = Array.isArray(body) ? body : [body]
    } catch (error) {
        throw {
            type: 'attempts_error',
            details: {
                body: body,
                actor: actor,
                error: error
            }
        }
    }

    const result_promises = []
    for (const doc of array_of_docs) {
        result_promises.push(authorization(doc, actor, session))
    }

    const results = await Promise.all(result_promises)
    return results
}

module.exports = attempts