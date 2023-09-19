const save_document = async (document, session) => {
    return await document.save({ session: session })
}

module.exports = save_document