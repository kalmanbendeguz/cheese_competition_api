const remove_cheese = function () {
  return async function (req, res, next) {
    console.log("remove_cheese");

    const Cheese_Model =
      require("../../config/db").mongoose.connection.db.collection("cheeses");
    const Rating_Model = require("../../models/Rating");
    const Rating_Picture_Model = require("../../models/Rating_Picture");
    const Hand_In_Model = require("../../models/Hand_In");

    const cheese = await Cheese_Model.findOne({
      public_id: req.query.public_id,
    });

    const table_leader_rating = await Rating_Model.findOne({
      secret_id: cheese?.secret_id,
      table_leader: true,
    });

    //ratings
    await Rating_Model.deleteMany({
      secret_id: cheese?.secret_id,
    });

    //rating pictures
    await Rating_Picture_Model.deleteMany({
      rating_id: table_leader_rating?._id,
    });

    // hand ins
    await Hand_In_Model.deleteMany({
      public_id: cheese?.public_id,
    });

    // cheese
    await Cheese_Model.deleteMany({
      public_id: req.query.public_id,
    });

    return next();
  };
};

module.exports = remove_cheese;
