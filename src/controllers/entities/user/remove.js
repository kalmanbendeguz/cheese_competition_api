const remove = async (query, user, parent_session) => {

    // 1. Validate query
    const remove_user_validator = require('../../../validators/requests/api/user/remove')
    try {
        await remove_user_validator.validateAsync(query)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Authorize remove
    const authorizer = require('../../../authorizers/entities/user')
    try {
        query = authorizer(query, 'remove', user)
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 3. Start session and transaction if they don't exist
    const User_Model = require('../../../models/User')
    const session = parent_session ?? await User_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 4. Find
    const filter = query
    const users = await User_Model.find(filter, null, { session: session })
    if (users.length === 0) {
        if (!parent_session) {
            if (session.inTransaction()) await session.commitTransaction()
            await session.endSession()
        }
        return {
            code: 200,
            data: 'no_documents_found_to_remove',
        }
    }

    // 5. Validate documents
    const user_validator = require('../../../validators/schemas/User')
    try {
        const validator_promises = users.map(
            (u) => user_validator.validateAsync(u)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 500, data: err.details }
    }

    // 6. Check dependencies: Ask all dependencies if this remove is possible.
    const dependencies = ['allowed_role', 'competition']
    const dependency_approvers = dependencies.map(dependency => require(`../${dependency}/approve_dependent_mutation/user`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(dependency_approver(users.map(u => ({ old: u, new: null })), user, session))
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

    // 7. Check collection integrity
    // You cannot change the number of organizers from N>0 to N=0
    const organizers_in_total = await User_Model.find(
        { roles: { $in: ['organizer'] } },
        null,
        { session: session }
    )
    const organizers_to_remove = users.filter(u => u.roles.includes('organizer'))
    if (organizers_in_total.length === organizers_to_remove.length) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return {
            code: 403,
            data: 'it_is_not_allowed_to_remove_the_last_organizer',
        }
    }

    // 8. Remove documents
    const ids_to_delete = users.map((u) => u._id.toString())
    await User_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // 9. Update dependents
    // Dependents are: Active_Password_Reset, Rating, Product

    const update_dependent_promises = []

    // If we remove a User, we should remove all Active_Password_Resets associated with it.
    const remove_active_password_reset = require('../active_password_reset/remove')
    update_dependent_promises.push(
        remove_active_password_reset(
            { user_id: { $in: ids_to_delete } },
            user,
            session
        )
    )

    // If we remove a User, we should remove all Ratings associated with it.
    const remove_rating = require('../rating/remove')
    update_dependent_promises.push(
        remove_rating(
            { judge_id: { $in: ids_to_delete } },
            user,
            session
        )
    )

    // If we remove a User, we should remove all Products associated with it.
    const remove_product = require('../product/remove')
    update_dependent_promises.push(
        remove_product(
            { competitor_id: { $in: ids_to_delete } },
            user,
            session
        )
    )

    const update_dependent_results = await Promise.all(update_dependent_promises)
    const failed_operation = update_dependent_results.find(result =>
        !(typeof result.code === 'number' && result.code >= 200 && result.code <= 299)
    )

    if (failed_operation) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return failed_operation
    }

    // 10. Commit transaction and end session
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 11. Reply
    return {
        code: 200,
        data: undefined,
    }
}

module.exports = remove