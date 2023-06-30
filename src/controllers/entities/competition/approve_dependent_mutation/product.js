module.exports = async (products, user, session) => {
    return {
        approved: true,
        reason: null
    }
}

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