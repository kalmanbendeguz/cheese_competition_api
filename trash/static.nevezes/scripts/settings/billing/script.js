window.onbeforeunload = function () {
  return !0;
};
const billing_settings_form = document.querySelector(
  "form[id=billing_settings_form]"
);
function on_billing_settings_form_submit(n) {
  window.onbeforeunload = null;
}
billing_settings_form.addEventListener(
  "submit",
  on_billing_settings_form_submit
);
