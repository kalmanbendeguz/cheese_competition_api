const render_successful_registration = function () {
  return function (req, res, next) {
    console.log("render_successful_registration");

    (res.locals.messages ||= []).push(
      `Sikeres regisztráció, a belépés előtt erősítsd meg a regisztrációd, az emailben kapott linkre kattintva!
            Ezt az oldalt bezárhatod.`
    );

    return res.render("unauthenticated_message");
  };
};

module.exports = render_successful_registration;
