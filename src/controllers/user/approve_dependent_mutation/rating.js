module.exports = async (ratings, user, session) => {
    return {
        approved: true,
        reason: null
    }
}
//   // all users should be activated judges, and they should be arrived to this competition.
//   for (const rating of body) {
//       const competition_id = (await Product_Model.findById(rating.product_id))
//           .competition_id
//       if (
//           !(await User_Model.exists({
//               _id: rating.judge_id,
//               roles: { $in: ['judge'] },
//               registration_temporary: false,
//               arrived: { $in: [competition_id] },
//           }))
//       )
//           return {
//               code: 403,
//               data: 'at_least_one_provided_user_does_not_exist_or_not_a_judge_or_registration_temporay_or_not_arrived_to_provided_competition',
//           }
//   }