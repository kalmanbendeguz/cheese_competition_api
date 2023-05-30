const get_page_number = async function (req, res, next) {
  try {
    //console.log('get_page_number')

    res.locals.page = req?.query?.page ?? 1;

    if (
      isNaN(res.locals.page) ||
      !Number.isInteger(Number(res.locals.page)) ||
      res.locals.page < 1
    ) {
      res.locals.page = 1;
    }

    const number_of_cheeses =
      (await req.app.models.cheese.countDocuments({
        manufacturer: req.user.id,
      })) +
      (await req.app.models.unpaid_cheese.countDocuments({
        "product.manufacturer": req.user.id,
      }));

    res.locals.max_page_number = Math.max(Math.ceil(number_of_cheeses / 5), 1);
    if (res.locals.page > res.locals.max_page_number)
      res.locals.page = res.locals.max_page_number;

    res.locals.page = Number(res.locals.page);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_page_number;
