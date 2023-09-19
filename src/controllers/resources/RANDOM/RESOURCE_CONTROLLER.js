const resource_controller = (cu) => async (document, session) => {

    await cu(document, session)
}

module.exports = resource_controller