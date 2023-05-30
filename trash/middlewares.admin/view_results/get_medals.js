const get_medals = function () {
  return function (req, res, next) {
    console.log("get_medals");

    for (let cheese of res.locals.cheeses) {
      cheese.medal = "-";
      if (cheese.average_score <= 100 && cheese.average_score >= 94.5) {
        cheese.medal = "ARANY";
      } else if (cheese.average_score < 94.5 && cheese.average_score >= 89.5) {
        cheese.medal = "EZÜST";
      } else if (cheese.average_score < 89.5 && cheese.average_score >= 84.5) {
        cheese.medal = "BRONZ";
      }
    }

    return next();
  };
};

module.exports = get_medals;
