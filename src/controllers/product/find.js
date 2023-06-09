// COMPETITOR, JUDGE, ORGANIZER, RECEIVER, SERVER
module.exports = async (query, user, parent_session) => {

    // 1. Validate query
    const find_product_validator = require('../../validators/requests/api/product/find')
    try {
        await find_product_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize find
    const authorizer = require('../../authorizers/product')
    try {
        query.filter = authorizer(query.filter, 'find', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Authorize project
    try {
        query.projection = authorizer(query.projection, 'project', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Product_Model = require('../../models/Product')
    const session = parent_session ?? await Product_Model.db.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Find
    const filter = query.filter
    const projection = query.projection // if you pass an unknown value, it will ignore it
    const options = query.options // limit: validated, skip: validated, sort: what if you pass an unknown key?

    const products = await Product_Model.find(
        filter,
        projection, // is undefined okay? or should i convert to null
        { ...options, session: session } // is undefined okay? or should i convert to null
    )

    // 6. Validate documents
    const product_validator = require('../../validators/schemas/Product')
    try {
        const validator_promises = products.map(
            (product) =>
                product_validator.validateAsync(
                    product
                )
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 7. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 8. Send
    return {
        code: 200,
        data: products,
    }
}