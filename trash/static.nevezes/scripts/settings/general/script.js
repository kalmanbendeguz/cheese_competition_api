window.onbeforeunload = function () {
  return !0;
};
const general_settings_form = document.querySelector(
  "form[id=general_settings_form]"
);
function on_general_settings_form_submit(n) {
  window.onbeforeunload = null;
}
general_settings_form.addEventListener(
  "submit",
  on_general_settings_form_submit
);
