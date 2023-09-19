
module.exports = (authorization) => async (body, actor, session) => {

    const array_of_docs = Array.isArray(body) ? body : [body]

    for (const doc of array_of_docs) {
        await authorization(doc, actor, session)
    }

}
