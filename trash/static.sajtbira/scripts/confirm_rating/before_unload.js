window.onbeforeunload = function () {
  return !0;
};
const confirm_rating_form = document.querySelector(
  "form[id=confirm_rating_form]"
);
function on_confirm_rating_form_submit(n) {
  window.onbeforeunload = null;
}
confirm_rating_form.addEventListener("submit", on_confirm_rating_form_submit);
const modify_button = document.querySelector("input[id=modify_button]");
function on_modify_button_click(n) {
  window.onbeforeunload = null;
}
modify_button.addEventListener("click", on_modify_button_click);
