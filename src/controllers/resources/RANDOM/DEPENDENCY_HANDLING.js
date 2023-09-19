const dependency_handling = (create) => async (document, session) => {

    // check dependencies
    // .....
    const dependent_fields = `custom logic ${document}`

    // do CUD
    await create(dependent_fields, session)

    // update dependents
    // .....
}

module.exports = dependency_handling