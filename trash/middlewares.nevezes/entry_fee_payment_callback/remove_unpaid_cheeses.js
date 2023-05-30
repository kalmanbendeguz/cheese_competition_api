const remove_unpaid_cheeses = async function (req, res, next) {
  try {
    //console.log('remove_unpaid_cheeses')

    await req.app.models.unpaid_cheese.deleteMany({
      _id: {
        $in: res.locals.unpaid_cheeses.map(
          (unpaid_cheese) => unpaid_cheese._id
        ),
      },
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = remove_unpaid_cheeses;
