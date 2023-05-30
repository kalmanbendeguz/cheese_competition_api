const get_registered_archived_cheese_numbers = function () {
  const Archived_Cheese_Model = require("../../models/Archived_Cheese");

  return async function (req, res, next) {
    //console.log('get_registered_archived_cheese_numbers')

    for (let user of res.locals.users) {
      user.registered_cheese_number =
        await Archived_Cheese_Model.countDocuments({ manufacturer: user._id });
    }

    return next();
  };
};

module.exports = get_registered_archived_cheese_numbers;
