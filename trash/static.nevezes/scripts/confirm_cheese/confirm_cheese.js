window.onbeforeunload = function () {
  return !0;
};
const confirm_cheese_form = document.querySelector(
    "form[id=confirm_cheese_form]"
  ),
  modify_button = document.querySelector("input[id=modify_button]");
function on_confirm_cheese_form_submit(o) {
  window.onbeforeunload = null;
}
function on_modify_button_click(o) {
  window.onbeforeunload = null;
}
confirm_cheese_form.addEventListener("submit", on_confirm_cheese_form_submit),
  modify_button.addEventListener("click", on_modify_button_click);
