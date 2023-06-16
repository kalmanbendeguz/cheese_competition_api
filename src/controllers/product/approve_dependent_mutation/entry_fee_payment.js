module.exports = async (entry_fee_payments, user, session) => {
    return {
        approved: true,
        reason: null
    }
}
//(previous_state={null/prevstate}, new_state={null/newstate})
//=> 
//{true, null} | {false,reason}
//
//// post     = prevstate = null,      newstate = newstate
//// put      = prevstate = prevstate, newstate = newstate
//// delete   = prevstate = prevstate, newstate = null