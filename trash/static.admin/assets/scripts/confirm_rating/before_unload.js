window.onbeforeunload = function () {
  return true;
};

const confirm_rating_form = document.querySelector(
  "form[id=confirm_rating_form]"
);

confirm_rating_form.addEventListener("submit", on_confirm_rating_form_submit);

function on_confirm_rating_form_submit(e) {
  window.onbeforeunload = null;
}

const modify_button = document.querySelector("input[id=modify_button]");
modify_button.addEventListener("click", on_modify_button_click);
function on_modify_button_click(e) {
  window.onbeforeunload = null;
}
