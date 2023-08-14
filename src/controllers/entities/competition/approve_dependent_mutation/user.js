const approve_user_mutation = async (users, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(users)) {
        return {
            approved: false,
            reason: 'provided_users_is_not_an_array'
        }
    } else if (users.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!users[0].old && !users[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!users[0].old && users[0].new) {
        action = 'create'
    } else if (!users[0].old && users[0].new) {
        action = 'remove'
    } else if (users[0].old && users[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner Competition documents into an array
    // Projection should contain the _id, and the fields that are needed to check if User mutation is allowed.
    const table_leader_competition_ids = action === 'remove' ?
        users.flatMap(u => u.old.table_leader).map(competition_id => competition_id.toString())
        :
        users.flatMap(u => u.new.table_leader).map(competition_id => competition_id.toString())

    const arrived_competition_ids = action === 'remove' ?
        users.flatMap(u => u.old.arrived).map(competition_id => competition_id.toString())
        :
        users.flatMap(u => u.new.arrived).map(competition_id => competition_id.toString())

    const competition_ids = table_leader_competition_ids.concat(arrived_competition_ids)
    const unique_competition_ids = [...new Set(competition_ids)]

    const find_competition = require('../find')
    const competitions = (await find_competition(
        {
            filter: {
                _id: { $in: unique_competition_ids },
            },
            projection: {
                _id: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on Product, is this mutation possible?
    // All provided product_ids should belong to a real Product.
    if (action !== 'remove' && unique_competition_ids.length !== competitions.length) {
        return {
            approved: false,
            reason: 'in_product_at_table_leader_array_or_arrived_array_not_all_provided_competition_ids_belong_to_a_real_competition'
        }
    }

    // 4. Based on Competition's dependencies, is this mutation possible?
    // The dependencies will only see that Competition has changed, they won't know anything about User.
    // Competition has no dependencies.

    // 5. Approve
    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_user_mutation