const get_rating_pictures = function () {
  return async function (req, res, next) {
    try {
      console.log("get_rating_pictures");

      const Rating_Model = require("../../models/Rating");
      const Archived_Rating_Model = require("../../models/Archived_Rating");
      const Rating_Picture_Model = require("../../models/Rating_Picture");
      const Archived_Rating_Picture_Model = require("../../models/Archived_Rating_Picture");

      res.locals.rating_picture = {};

      if (req.query.picture_state === "regular") {
        const table_leader_rating = await Rating_Model.findOne({
          secret_id: req.query.secret_id,
          table_leader: true,
        });

        if (!table_leader_rating) return res.sendStatus(404);

        const rating_pictures = await Rating_Picture_Model.findOne({
          rating_id: table_leader_rating._id,
        });

        res.locals.rating_picture =
          rating_pictures.pictures[Number(req.query.index)];
      }

      if (req.query.picture_state === "archived") {
        const table_leader_rating = await Archived_Rating_Model.findOne({
          secret_id: req.query.secret_id,
          table_leader: true,
        });

        if (!table_leader_rating) return res.sendStatus(404);

        const rating_pictures = await Archived_Rating_Picture_Model.findOne({
          rating_id: table_leader_rating._id,
        });

        res.locals.rating_picture =
          rating_pictures.pictures[Number(req.query.index)];
      }

      return next();
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = get_rating_pictures;
