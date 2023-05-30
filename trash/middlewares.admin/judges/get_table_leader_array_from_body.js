const get_table_leader_array_from_body = function () {
  return function (req, res, next) {
    console.log("get_table_leader_array_from_body");

    //console.log(req.body)

    res.locals.table_leaders = Object.keys(req.body)
      .filter((x) => x.startsWith("table_leader"))
      .map((x) => x.slice("table_leader_".length));

    //console.log(res.locals.table_leaders)

    return next();
  };
};

module.exports = get_table_leader_array_from_body;
