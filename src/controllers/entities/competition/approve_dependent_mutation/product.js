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
    if (unique_competition_ids.length !== competitions.length) {
        return {
            approved: false,
            reason: 'not_all_provided_competition_ids_belong_to_a_real_competition'
        }
    }

    const string_is_route_in_tree = require('../../../../helpers/string_is_route_in_tree')

    for (const product of products) {
        if (action === 'create') {
            const competition_of_product = competitions.find(competition => competition._id.toString() === product.new.competition_id.toString())
            if(!competition_of_product.entry_opened) {
                return {
                    approved: false,
                    reason: 'can_not_create_a_product_because_competition_is_closed'
                }
            }
            if(!string_is_route_in_tree(product.new.product_category_id, competition_of_product.product_category_tree)) {
                return {
                    approved: false,
                    reason: 'can_not_create_a_product_because_product_category_id_is_not_a_route_in_competition_product_category_tree'
                }
            }
            if(!)
        } else if (action === 'update') {

        } else if (action === 'remove') {

        }

    }

    //for (const competition of competitions) {
    //    if(action === 'create') {
    //        if (!competition.entry_opened || )
    //    }
    //
    //}

    // If we change the approval_type to "association_member", then the owner User should be association_member=true
    for (const product of products) {
        if ((product.old?.approval_type ?? null !== 'association_member') && (product.new?.approval_type ?? null === 'association_member')) {
            // For later: it might be a better way to just put the owner User into a variable, for further checks.
            if (!users.some(u => u._id.toString() === product.new.competitor_id.toString() && (u.association_member ?? false === true))) {
                return {
                    approved: false,
                    reason: 'not_possible_to_change_approval_type_to_association_member_because_owner_competitor_is_not_association_member'
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

// create: 
// only if entry is opened

// remvoe: 


//// comp: exist? is entry opened?
//const unique_competition_ids = [
//    ...new Set(body.map((product) => product.competition_id.toString())),
//]
//if (
//    (await Competition_Model.countDocuments({
//        _id: { $in: unique_competition_ids },
//        entry_opened: true,
//    })) !== unique_competition_ids.length
//)
//    return {
//        code: 403,
//        data: 'one_or_more_provided_competitions_are_not_existing_or_not_opened',
//    }
//
//// is the product category valid?
//const competitions = await Competition_Model.find(
//    { _id: { $in: unique_competition_ids } },
//    [
//        '_id',
//        'product_category_tree',
//        'payment_needed',
//        'association_members_need_to_pay',
//    ],
//    { lean: true }
//)
//for (const product of body) {
//    const current_product_category_tree = competitions.find(
//        (competition) => competition._id === product.competition_id
//    ).product_category_tree
//    const found_category = find_in_tree(
//        current_product_category_tree,
//        (node) =>
//            node.id === product.product_category_id &&
//            node.children.length === 0 // csak legalsó szintű kategóriát lehet választani.
//    )
//    if (!found_category)
//        return {
//            code: 400,
//            data: 'provided_category_is_invalid',
//        }
//}* /
//
//// product_category_id ONLY can be changed if the competition was NEVER opened.
//// = last_competition_open_date = UNDEFINED !!!

// TO REMOVE: // entry should be opened. for COMPETITOR
// competititon should be closed for COMPETITOR