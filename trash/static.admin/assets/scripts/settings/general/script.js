window.onbeforeunload = function () {
  return true;
};

const general_settings_form = document.querySelector(
  "form[id=general_settings_form]"
);

general_settings_form.addEventListener(
  "submit",
  on_general_settings_form_submit
);

function on_general_settings_form_submit(e) {
  window.onbeforeunload = null;
}
