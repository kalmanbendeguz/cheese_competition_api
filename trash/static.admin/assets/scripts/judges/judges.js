const remove_allowed_judge_forms = document.querySelectorAll(
  "form[class=remove_allowed_judge_form]"
);

remove_allowed_judge_forms.forEach((remove_allowed_judge_form) => {
  remove_allowed_judge_form.addEventListener(
    "submit",
    on_remove_allowed_judge_form_submit
  );
});

async function on_remove_allowed_judge_form_submit(e) {
  if (!confirm("Biztosan törölni akarod?")) e.preventDefault();
}
