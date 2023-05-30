const allowed_judge_email_dialog = document.querySelector(
  "#allowed_judge_email_dialog"
);
const add_allowed_judge_button = document.querySelector(
  "#add_allowed_judge_button"
);
const cancel_allowed_judge_email_button = document.querySelector(
  "#cancel_allowed_judge_email_button"
);
const add_allowed_judge_form = document.querySelector(
  "#add_allowed_judge_form"
);

add_allowed_judge_button.addEventListener("click", () => {
  allowed_judge_email_dialog.showModal();
});

add_allowed_judge_form.addEventListener("submit", () => {
  allowed_judge_email_dialog.close();
});

cancel_allowed_judge_email_button.addEventListener("click", () => {
  allowed_judge_email_dialog.close();
});
