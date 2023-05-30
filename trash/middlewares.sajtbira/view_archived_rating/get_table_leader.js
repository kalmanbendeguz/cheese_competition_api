const get_table_leader = async function (req, res, next) {
  try {
    //console.log('get_archived_rating')

    const table_leader_rating = await req.app.models.archived_rating.findOne({
      secret_id: res.locals.cheese.secret_id,
      table_leader: true,
    });

    const table_leader_email = table_leader_rating?.judge_email ?? null;

    if (!table_leader_email) return next();

    res.locals.table_leader_name = (
      await req.app.models.judge_user.findOne({
        email: table_leader_email,
      })
    )?.full_name;

    if (req.user.email === table_leader_email)
      res.locals.current_user_table_leader = true;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = get_table_leader;
