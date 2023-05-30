window.onbeforeunload = function () {
  return true;
};

const billing_settings_form = document.querySelector(
  "form[id=billing_settings_form]"
);

billing_settings_form.addEventListener(
  "submit",
  on_billing_settings_form_submit
);

function on_billing_settings_form_submit(e) {
  window.onbeforeunload = null;
}
