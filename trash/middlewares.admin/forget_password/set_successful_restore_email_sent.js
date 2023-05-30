const set_successful_restore_email_sent = function () {
  return function (req, res, next) {
    console.log("set_successful_restore_email_sent");
    (res.locals.successes ||= []).push(
      "A jelszó-helyreállító linket elküldtük a megadott e-mail címre. A linket a következő 15 percben tudod használni új jelszó beállítására."
    );

    res.locals.email = req.body.email;

    return next();
  };
};

module.exports = set_successful_restore_email_sent;
