function onPasswordChange() {
  const o = document.querySelector("input[id=password]"),
    e = document.querySelector("input[id=confirm_password]");
  e.value === o.value
    ? e.setCustomValidity("")
    : e.setCustomValidity(
        document.querySelector('meta[data-name="passwords_not_match_text"]')
          .content
      );
}
window.onbeforeunload = function () {
  return !0;
};
const password = document.querySelector("input[id=password]"),
  confirm_password = document.querySelector("input[id=confirm_password]");
password.addEventListener("change", onPasswordChange),
  confirm_password.addEventListener("change", onPasswordChange);
const registration_form = document.querySelector("form[id=registration_form]");
function on_registration_form_submit(o) {
  window.onbeforeunload = null;
}
registration_form.addEventListener("submit", on_registration_form_submit);
