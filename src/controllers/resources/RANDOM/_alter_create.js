const alter_create = async (body, actor, session) => {


    // Check dependencies
    // Dependencies: [Rating,  Competition, Competition__User, Product, User]
    // At least one dependency should exist
    const dependency_promises = []
    const find_one_competition = require('../competition/find_one')
    const find_one_competition__user = require('../competition__user/find_one')
    const find_one_product = require('../product/find_one')
    const find_one_user = require('../user/find_one')

    const competition = find_one_competition({ _id: body.competition_id }, session)
    const competition__user = find_one_competition__user({ _id: body.competition__user_id }, session)
    const product = find_one_product({ _id: body.product_id }, session)
    const user = find_one_user({ _id: body.user_id }, session)

    dependency_promises.push(competition, competition__user, product, user)

    const dependencies = await Promise.all(dependency_promises)

    if (dependencies.some(dependency => !dependency)) {
        // abort
    }


    // competition__user_id, product_id, and user_id should be compound unique.

    // aspects should conform to competition's rating_sheets and product's product_category_id

    // competition__user should have the role 'judge'

    // user should have the role "judge"
    if (!user.roles.includes('judge')) {
        // abort
    }

    // GENERATE DOCUMENT
    const generate = require('./index.js').generate
    const generated_document = generate()



    // ...



    // 7. Check dependencies: Ask all dependencies if this creation is possible.
    //const dependencies = ['product', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/rating`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(ratings.map(rating => ({ old: null, new: rating })), user, session))
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 403,
            data: unapproved.reason
        }
    }

    // 8. Check collection integrity
    // We need compound uniqueness of { product_id, judge_id }
    const new_product_ids_and_judge_ids = ratings.map(rating => `${rating.product_id.toString()}${rating.judge_id.toString()}`)
    const unique_new_product_ids_and_judge_ids = [...new Set(new_product_ids_and_judge_ids)]
    if (new_product_ids_and_judge_ids.length !== unique_new_product_ids_and_judge_ids.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        } return {
            code: 409,
            data: 'provided_product_ids_and_judge_ids_are_not_compound_unique',
        }
    }

    for (const rating of ratings) {
        if (
            await Rating_Model.exists({
                product_id: rating.product_id,
                judge_id: rating.judge_id,
            }, { session: session })
        ) {
            if (!parent_session) {
                if (session.inTransaction()) await session.abortTransaction()
                await session.endSession()
            }
            return {
                code: 409,
                data: 'product_id_and_judge_id_should_be_compound_unique',
            }
        }
    }

    // 9. Save created documents
    await Rating_Model.bulkSave(ratings, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated.

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined,
    }
}

module.exports = alter_create