const check_entry_closed = function () {
  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    try {
      //console.log('check_entry_opened')

      const competition_opened = await Key_Value_Model.findOne({
        key: "competition_opened",
      });

      if (!competition_opened)
        throw new Error("A 'competition_opened' dokumentum nem létezik.");

      if (!competition_opened.value) return next();

      req.app.push_cookie_array(
        req,
        res,
        "errors",
        "Nem lehet alaphelyzetbe állítani, mert a verseny nincs lezárva."
      );

      return res.redirect("/coordination");
    } catch (err) {
      return next(err);
    }
  };
};
module.exports = check_entry_closed;
