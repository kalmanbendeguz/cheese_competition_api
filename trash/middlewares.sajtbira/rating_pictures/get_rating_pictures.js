const get_rating_pictures = async function (req, res, next) {
  try {
    console.log("get_rating_pictures");

    res.locals.rating_picture = {};

    if (req.query.picture_state === "temporary") {
      const rating_pictures =
        await req.app.models.temporary_rating_picture.findOne({
          confirm_id: req.query.confirm_id,
        });

      res.locals.rating_picture =
        rating_pictures.pictures[Number(req.query.index)];
    }

    if (req.query.picture_state === "regular") {
      const table_leader_rating = await req.app.models.rating.findOne({
        secret_id: req.query.secret_id,
        table_leader: true,
      });

      if (!table_leader_rating) return next();

      const rating_pictures = await req.app.models.rating_picture.findOne({
        rating_id: table_leader_rating.id,
      });

      res.locals.rating_picture =
        rating_pictures.pictures[Number(req.query.index)];
    }

    if (req.query.picture_state === "archived") {
      const table_leader_rating = await req.app.models.archived_rating.findOne({
        secret_id: req.query.secret_id,
        table_leader: true,
      });

      if (!table_leader_rating) return next();

      const rating_pictures =
        await req.app.models.archived_rating_picture.findOne({
          rating_id: table_leader_rating.id,
        });

      res.locals.rating_picture =
        rating_pictures.pictures[Number(req.query.index)];
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_rating_pictures;
