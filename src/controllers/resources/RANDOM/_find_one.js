const find_one = async (model, filter, session) => {
    return await model.findOne(filter)
}