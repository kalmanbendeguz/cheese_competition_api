window.onbeforeunload = function () {
  return !0;
};
const rating_form = document.querySelector("form[id=rating_form]");
function on_rating_form_submit(n) {
  window.onbeforeunload = null;
}
rating_form.addEventListener("submit", on_rating_form_submit);
