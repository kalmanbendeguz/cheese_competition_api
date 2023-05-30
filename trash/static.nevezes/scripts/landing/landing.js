const remove_cheese_forms = document.querySelectorAll(
  "form[class=remove_cheese_form]"
);
for (let e of remove_cheese_forms)
  e.addEventListener("submit", on_remove_cheese_form_submit);
async function on_remove_cheese_form_submit(e) {
  confirm(
    document.querySelector('meta[data-name="confirm_remove_cheese_text"]')
      .content
  ) || e.preventDefault();
}
