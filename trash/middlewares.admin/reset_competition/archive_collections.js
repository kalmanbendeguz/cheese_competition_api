const archive_collections = function () {
  const Cheese_Model = require("../../models/Cheese");
  const Archived_Cheese_Model = require("../../models/Archived_Cheese");

  const Hand_In_Model = require("../../models/Hand_In");
  const Archived_Hand_In_Model = require("../../models/Archived_Hand_In");

  const Rating_Model = require("../../models/Rating");
  const Archived_Rating_Model = require("../../models/Archived_Rating");

  const Rating_Picture_Model = require("../../models/Rating_Picture");
  const Archived_Rating_Picture_Model = require("../../models/Archived_Rating_Picture");

  const Entry_Certificate_Model = require("../../models/Entry_Certificate");
  const Archived_Entry_Certificate_Model = require("../../models/Archived_Entry_Certificate");

  const Entry_Fee_Payment_Model = require("../../models/Entry_Fee_Payment");
  const Archived_Entry_Fee_Payment_Model = require("../../models/Archived_Entry_Fee_Payment");

  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    //console.log('archive_collections')

    const all_cheeses = await Cheese_Model.find();
    await Archived_Cheese_Model.insertMany(all_cheeses);
    await Cheese_Model.deleteMany();

    const all_hand_ins = await Hand_In_Model.find();
    await Archived_Hand_In_Model.insertMany(all_hand_ins);
    await Hand_In_Model.deleteMany();

    const all_ratings = await Rating_Model.find();
    await Archived_Rating_Model.insertMany(all_ratings);
    await Rating_Model.deleteMany();

    const all_rating_pictures = await Rating_Picture_Model.find();
    await Archived_Rating_Picture_Model.insertMany(all_rating_pictures);
    await Rating_Picture_Model.deleteMany();

    const all_entry_certificates = await Entry_Certificate_Model.find();
    await Archived_Entry_Certificate_Model.insertMany(all_entry_certificates);
    await Entry_Certificate_Model.deleteMany();

    const all_entry_fee_payments = await Entry_Fee_Payment_Model.find();
    await Archived_Entry_Fee_Payment_Model.insertMany(all_entry_fee_payments);
    await Entry_Fee_Payment_Model.deleteMany();

    // we dont archive unpaid products, just delete
    const Unpaid_Cheese_Model =
      require("../../config/db").mongoose.connection.db.collection(
        "unpaid_cheeses"
      );
    await Unpaid_Cheese_Model.deleteMany({});

    const now = new Date();

    await Key_Value_Model.findOneAndUpdate(
      { key: "competition_reset_time" },
      { value: now },
      { upsert: true }
    );

    return next();
  };
};

module.exports = archive_collections;
