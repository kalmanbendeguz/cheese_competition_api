const approve_entry_fee_payment_mutation = async (entry_fee_payments, user, session) => {

    // 1. Detect action
    let action
    if (!Array.isArray(entry_fee_payments)) {
        return {
            approved: false,
            reason: 'provided_entry_fee_payments_is_not_an_array'
        }
    } else if (entry_fee_payments.length === 0) {
        return {
            approved: true,
            reason: null
        }
    } else if (!entry_fee_payments[0].old && !entry_fee_payments[0].new) {
        return {
            approved: false,
            reason: 'dependency_approver_got_both_states_null'
        }
    } else if (!entry_fee_payments[0].old && entry_fee_payments[0].new) {
        action = 'create'
    } else if (!entry_fee_payments[0].old && entry_fee_payments[0].new) {
        action = 'remove'
    } else if (entry_fee_payments[0].old && entry_fee_payments[0].new) {
        action = 'update'
    } else {
        return {
            approved: false,
            reason: 'dependency_approver_unknown_error'
        }
    }

    // 2. We need to query the owner Product documents into an array
    // Projection should contain the _id, and the fields that are needed to check if Entry_Fee_Payment mutation is allowed.
    const product_ids = action === 'create' ?
        entry_fee_payments.flatMap(entry_fee_payment => entry_fee_payment.new.product_ids).map(product_id => product_id.toString())
        :
        entry_fee_payments.flatMap(entry_fee_payment => entry_fee_payment.old.product_ids).map(product_id => product_id.toString())
    const unique_product_ids = [...new Set(product_ids)]

    const find_product = require('../find')
    const products = (await find_product(
        {
            filter: {
                _id: { $in: unique_product_ids },
            },
            projection: {
                _id: 1,
                approved: 1,
                approval_type: 1
            }
        },
        { role: 'SERVER' },
        session
    ))?.data ?? []

    // 3. Based only on Product, is this mutation possible?
    // All provided product_ids should belong to a real Product.
    if (unique_product_ids.length !== products.length) {
        return {
            approved: false,
            reason: 'not_all_provided_product_ids_belong_to_a_real_product'
        }
    }

    // Creation is not possible if any owner Products are approved
    if (action === 'create' && products.some(product => product.approved === true)) {
        return {
            approved: false,
            reason: 'not_possible_to_create_an_entry_fee_payment_which_belongs_to_an_already_approved_product'
        }
    }

    // Removal is not possible if any owner Product has "approval_type" = "payment"
    if (action === 'remove' && products.some(product => product.approved === true && product.approval_type === 'payment')) {
        return {
            approved: false,
            reason: 'not_possible_to_remove_an_entry_fee_payment_which_belongs_to_a_paid_product'
        }
    }

    // 4. Based on Product's dependencies, is this mutation possible?
    // The dependencies will only see that Product has changed, they won't know anything about Entry_Fee_Payment.
    const dependencies = ['competition', 'user']
    const dependency_approvers = dependencies.map(dependency => require(`../../${dependency}/approve_dependent_mutation/product`))

    const dependency_approver_promises = []
    for (const dependency_approver of dependency_approvers) {
        dependency_approver_promises.push(
            dependency_approver(
                products.map(product => ({ old: product, new: product })),
                user,
                session
            )
        )
    }
    const dependency_approver_results = await Promise.all(dependency_approver_promises)

    const unapproved = dependency_approver_results.find(dependency_approver_result => !dependency_approver_result.approved)
    if (unapproved) {
        return unapproved
    }

    // 5. Approve
    return {
        approved: true,
        reason: null
    }
}

module.exports = approve_entry_fee_payment_mutation