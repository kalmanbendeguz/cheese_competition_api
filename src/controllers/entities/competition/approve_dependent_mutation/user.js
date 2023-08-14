module.exports = async (users, user, session) => {
    return {
        approved: true,
        reason: null
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