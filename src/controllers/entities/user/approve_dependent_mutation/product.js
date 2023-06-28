module.exports = async (products, user, session) => {
    return {
        approved: true,
        reason: null
    }
}
//// user: exist? is he competitor? isnt the reg. temporary?
//const unique_competitor_ids =
//    user.role === 'competitor'
//        ? [user._id.toString()]
//        : [
//            ...new Set(
//                body.map((product) => product.competition_id.toString())
//            ),
//        ]
//if (
//    (await User_Model.countDocuments({
//        _id: { $in: unique_competitor_ids },
//        roles: { $in: ['competitor'] },
//        registration_temporary: false,
//    })) !== unique_competitor_ids.length
//)
//    return {
//        code: 403,
//        data: 'one_or_more_provided_competitor_ids_are_not_existing_or_not_competitors_or_registration_is_temporary',
//    }