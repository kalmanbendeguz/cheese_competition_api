module.exports = (old_state, new_state, user,session) => {
    // this is associated with class PRODUCT

    // user can be: JUDGE, ORGANIZER, SERVER

    // productmodel
    // user find controller
    // competition find controller
    // user.mutation_approver.product ?
    // competition.mutation_approver.product ?
    
    // FOR EACH OPERATION, WE NEED TO USE THE SESSION
    //

    // detect action
    let action
    if (old_state === null && new_state !== null) action = 'create'
    else if (old_state !== null && new_state !== null) action = 'update'
    else if (old_state !== null && new_state === null) action = 'remove'
    else return { approved: false, reason: 'dependent_mutation_approver_got_both_states_null' }

    if (action === 'create') {
        if (user.role === 'SERVER') {

        } else return { approved: false, reason: 'unknown_user_role' }
    } else if (action === 'update') {
        if (user.role === 'judge') {

        } else if (user.role === 'organizer') {

        } else if (user.role === 'SERVER') {

        } else return { approved: false, reason: 'unknown_user_role' }
    } else if (action === 'remove') {
        if (user.role === 'organizer') {

        } else if (user.role === 'SERVER') {

        } else return { approved: false, reason: 'unknown_user_role' }
    } else return { approved: false, reason: 'unknown_action' }


    // we should find the associated document: 
    const ownerdoc = Product_Model.find(_id: old_or_new_state.product_id);

    // if you want to change rating, you can do it only if competition is opened.
    if (rating_wants_to_change) {
        if (user == 'judge') {
            const comp = competition_find_controller.find(_id: product.comp_id)
            if (!comp.comp_opened) {
                return {
                    approved: false,
                    reason: 'competition not opened :('
                }
            }
        }
    }
}


// (previous_state={null/prevstate}, new_state={null/newstate})
// => 
// {true, null} | {false,reason}

// post     = prevstate = null,      newstate = newstate
// put      = prevstate = prevstate, newstate = newstate
// delete   = prevstate = prevstate, newstate = null

// all products should exist and be approved and handed in
const unique_product_ids = [
    ...new Set(body.map((rating) => rating.product_id.toString())),
]
if (
    (await Product_Model.countDocuments({
        _id: { $in: unique_product_ids },
        approved: true,
        handed_in: true,
    })) !== unique_product_ids.length
)
    return {
        code: 403,
        data: 'one_or_more_provided_products_are_not_existing_or_not_approved_or_not_handed_in',
    }

    // competitions should be existing and opened.
    const products = await Product_Model.find(
        { _id: { $in: unique_product_ids } },
        ['_id', 'product_category_id'],
        { lean: true }
    )
    const unique_competition_ids = [
        ...new Set(
            products.map((product) => product.competition_id.toString())
        ),
    ]
    if (
        (await Competition_Model.countDocuments({
            _id: { $in: unique_competition_ids },
            competition_opened: true,
        })) !== unique_competition_ids.length
    )
        return {
            code: 403,
            data: 'one_or_more_provided_competitions_are_not_existing_or_not_opened',
        }

        // we need to check aspects's integrity
    const rating_sheet_of_category_id = require('../../helpers/rating_sheet_of_category_id')
    const rating_satisfies_sheet = require('../../helpers/rating_satisfies_sheet')
    for (const rating of body) {
        const product_of_rating = products.find(
            (product) => product._id.toString() === rating.product_id
        )
        const rating_sheet = rating_sheet_of_category_id(
            product_of_rating.product_category_id
        )
        if (!rating_satisfies_sheet(rating, rating_sheet))
            return {
                code: 403,
                data: 'rating_aspects_invalid',
            }
    }