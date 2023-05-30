window.onbeforeunload = function () {
  return true;
};

const rating_form = document.querySelector("form[id=rating_form]");

rating_form.addEventListener("submit", on_rating_form_submit);

function on_rating_form_submit(e) {
  window.onbeforeunload = null;
}
