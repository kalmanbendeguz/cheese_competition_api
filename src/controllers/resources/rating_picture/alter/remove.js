const remove = async (document, actor, session) => {

    // Check dependencies
    // Dependencies: [Rating_Picture, Competition, Competition__User, Product, Rating, User]
    // Nothing needs to be checked.

    // Remove document
    await document.deleteOne({ session: session })

    // Update dependents
    // Rating_Picture has no dependents.

    // Return
    return
}

module.exports = remove