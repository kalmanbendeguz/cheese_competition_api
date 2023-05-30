const get_archived_cheeses = async function (req, res, next) {
  try {
    //console.log('get_archived_cheeses')

    res.locals.archived_cheeses = await req.app.models.archived_cheese
      .find({ manufacturer: req.user.id })
      .sort({ createdAt: 1 });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_archived_cheeses;
