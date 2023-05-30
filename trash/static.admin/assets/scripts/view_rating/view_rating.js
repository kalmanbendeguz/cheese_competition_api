const delete_rating_forms = document.querySelectorAll(
  "form[class=delete_rating_form]"
);

delete_rating_forms.forEach((delete_rating_form) => {
  delete_rating_form.addEventListener("submit", on_delete_rating_form_submit);
});

async function on_delete_rating_form_submit(e) {
  if (!confirm("Biztosan törölni akarod?")) e.preventDefault();
}
