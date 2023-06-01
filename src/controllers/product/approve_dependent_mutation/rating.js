module.exports = (old_state, new_state, user) => {
    // this is associated with class PRODUCT

    // user can be: JUDGE, ORGANIZER, SERVER

    // productmodel
    // user find controller
    // competition find controller
    // user.mutation_approver.product ?
    // competition.mutation_approver.product ?

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