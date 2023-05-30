window.onbeforeunload = function () {
  return true;
};

const confirm_cheese_form = document.querySelector(
  "form[id=confirm_cheese_form]"
);
const modify_button = document.querySelector("input[id=modify_button]");

confirm_cheese_form.addEventListener("submit", on_confirm_cheese_form_submit);
modify_button.addEventListener("click", on_modify_button_click);

function on_confirm_cheese_form_submit(e) {
  window.onbeforeunload = null;
}

function on_modify_button_click(e) {
  window.onbeforeunload = null;
}
