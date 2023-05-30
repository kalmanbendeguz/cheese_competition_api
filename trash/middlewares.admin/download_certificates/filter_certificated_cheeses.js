const filter_certificated_cheeses = function () {
  return function (req, res, next) {
    console.log("filter_certificated_cheeses");

    res.locals.cheeses = res.locals.cheeses.filter(
      (cheese) => !isNaN(cheese.average_score) && cheese.average_score >= 84.5
    );

    return next();
  };
};

module.exports = filter_certificated_cheeses;
