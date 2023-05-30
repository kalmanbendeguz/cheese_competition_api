window.onbeforeunload = function () {
  return !0;
};
const password_settings_form = document.querySelector(
  "form[id=password_settings_form]"
);
function on_password_settings_form_submit(e) {
  window.onbeforeunload = null;
}
function onPasswordChange() {
  const e = document.querySelector("input[id=new_password]"),
    n = document.querySelector("input[id=confirm_new_password]");
  n.value === e.value
    ? n.setCustomValidity("")
    : n.setCustomValidity(
        document.querySelector('meta[data-name="passwords_not_match_text"]')
          .content
      );
}
password_settings_form.addEventListener(
  "submit",
  on_password_settings_form_submit
);
const new_password = document.querySelector("input[id=new_password]"),
  confirm_new_password = document.querySelector(
    "input[id=confirm_new_password]"
  );
new_password.addEventListener("change", onPasswordChange),
  confirm_new_password.addEventListener("change", onPasswordChange);
