// ALTER gets: data, actor, session
// data = filter, projection, options
// controller.alter_find = alter_find(Model)

const find = (Model) => async (filter, projection, options, actor, session) => {

    const documents = await Model.find(filter, projection, {...options, session:session})

    return documents ?? []
}

module.exports = find