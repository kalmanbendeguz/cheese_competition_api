const approve_product_mutation = async (products, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(products)) {
        return {
            approved: false,
            reason: 'provided_products_is_not_an_array'
        }
    } else if (products.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!products[0].old && !products[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!products[0].old && products[0].new) {
        action = 'create'
    } else if (!products[0].old && products[0].new) {
        action = 'remove'
    } else if (products[0].old && products[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner Competition documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Product mutation is allowed.
    const competition_ids = action === 'create' ?
        products.map(product => product.new.competition_id.toString())
        :
        products.map(product => product.old.competition_id.toString())
    const unique_competition_ids = [...new Set(competition_ids)]

    const find_competition = require('../find')
    const competitions = (await find_competition(
        {
            filter: {
                _id: { $in: unique_competition_ids },
            },
            projection: {
                _id: 1,
                // Check if anything else needed!
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on Competition, is this mutation possible?
    // All provided competition_ids should belong to a real Competition.
    if (action !== 'remove' && unique_competition_ids.length !== competitions.length) {
        return {
            approved: false,
            reason: 'not_all_provided_competition_ids_belong_to_a_real_competition'
        }
    }

    const tree_to_flat_array = require('../../../../helpers/tree_to_flat_array')

    for (const product of products) {
        const competition_of_product = action === 'create' ?
            competitions.find(competition => competition._id.toString() === product.new.competition_id.toString())
            :
            competitions.find(competition => competition._id.toString() === product.old.competition_id.toString())

        if (action === 'create') {
            if (!competition_of_product.entry_opened) {
                return {
                    approved: false,
                    reason: 'can_not_create_a_product_because_entry_is_closed'
                }
            }
            const product_category_array = tree_to_flat_array(competition_of_product.product_category_tree)
            if (!product_category_array.some(node => node.node_id === product.new.product_category_id)) {
                return {
                    approved: false,
                    reason: 'can_not_create_a_product_because_product_category_id_is_not_a_route_in_competition_product_category_tree'
                }
            }
            if (product.new.approved && product.new.approval_type === 'payment' && !competition_of_product.payment_needed) {
                return {
                    approved: false,
                    reason: 'can_not_create_a_product_because_product_approval_type_is_payment_but_competition_does_not_need_payments'
                }
            }
            if (product.new.approved && product.new.approval_type === 'association_member' && competition_of_product.association_members_need_to_pay) {
                return {
                    approved: false,
                    reason: 'can_not_create_a_product_because_product_approval_type_is_association_member_but_for_this_competition_association_members_also_need_to_pay'
                }
            }
        } else if (action === 'update') {
            if (user.role === 'competitor') {
                if (!competition_of_product.entry_opened) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_entry_is_closed'
                    }
                }
                if (competition_of_product.competition_opened) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_competition_is_opened'
                    }
                }

                const product_category_array = tree_to_flat_array(competition_of_product.product_category_tree)
                if (!product_category_array.some(node => node.node_id === product.new.product_category_id)) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_product_category_id_is_not_a_route_in_competition_product_category_tree'
                    }
                }

                if (product.new.approved && product.new.approval_type === 'payment' && !competition_of_product.payment_needed) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_product_approval_type_is_payment_but_competition_does_not_need_payments'
                    }
                }
                if (product.new.approved && product.new.approval_type === 'association_member' && competition_of_product.association_members_need_to_pay) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_product_approval_type_is_association_member_but_for_this_competition_association_members_also_need_to_pay'
                    }
                }
            } else if (user.role === 'organizer') {
                const product_category_array = tree_to_flat_array(competition_of_product.product_category_tree)
                if (!product_category_array.some(node => node.node_id === product.new.product_category_id)) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_product_category_id_is_not_a_route_in_competition_product_category_tree'
                    }
                }
                if (product.new.approved && product.new.approval_type === 'payment' && !competition_of_product.payment_needed) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_product_approval_type_is_payment_but_competition_does_not_need_payments'
                    }
                }
                if (product.new.approved && product.new.approval_type === 'association_member' && competition_of_product.association_members_need_to_pay) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_product_approval_type_is_association_member_but_for_this_competition_association_members_also_need_to_pay'
                    }
                }
            } else if (user.role === 'receiver') {
                if (competition_of_product.archived) {
                    return {
                        approved: false,
                        reason: 'can_not_update_product_because_competition_is_archived'
                    }
                }
            }
        } else if (action === 'remove') {
            if (user.role === 'competitor') {
                if (!competition_of_product.entry_opened) {
                    return {
                        approved: false,
                        reason: 'can_not_remove_product_because_entry_is_closed'
                    }
                }
                if (competition_of_product.competition_opened) {
                    return {
                        approved: false,
                        reason: 'can_not_remove_product_because_competition_is_opened'
                    }
                }
            }
        }
    }

    // 4. Based on Competition's dependencies, is this mutation possible?
    // The dependencies will only see that Competition has changed, they won't know anything about Product.
    // Competition has no dependencies.

    // 5. Approve
    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_product_mutation