window.onbeforeunload = function () {
  return !0;
};
const send_feedback_form = document.querySelector(
  "form[id=send_feedback_form]"
);
function on_send_feedback_form_submit(e) {
  window.onbeforeunload = null;
}
send_feedback_form.addEventListener("submit", on_send_feedback_form_submit);
