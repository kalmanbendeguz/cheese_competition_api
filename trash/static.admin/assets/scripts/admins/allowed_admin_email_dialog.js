const allowed_admin_email_dialog = document.querySelector(
  "#allowed_admin_email_dialog"
);
const add_allowed_admin_button = document.querySelector(
  "#add_allowed_admin_button"
);
const cancel_allowed_admin_email_button = document.querySelector(
  "#cancel_allowed_admin_email_button"
);
const add_allowed_admin_form = document.querySelector(
  "#add_allowed_admin_form"
);

add_allowed_admin_button.addEventListener("click", () => {
  allowed_admin_email_dialog.showModal();
});

add_allowed_admin_form.addEventListener("submit", () => {
  allowed_admin_email_dialog.close();
});

cancel_allowed_admin_email_button.addEventListener("click", () => {
  allowed_admin_email_dialog.close();
});
