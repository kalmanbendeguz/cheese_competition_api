const secret_id_dialog = document.querySelector("#secret_id_dialog"),
  rate_cheese_button = document.querySelector("#rate_cheese_button"),
  cancel_secret_id_button = document.querySelector("#cancel_secret_id_button"),
  dialog_form = document.querySelector("#secret_id_form");
rate_cheese_button.addEventListener("click", () => {
  secret_id_dialog.showModal();
}),
  dialog_form.addEventListener("submit", () => {
    secret_id_dialog.close();
  }),
  cancel_secret_id_button.addEventListener("click", () => {
    secret_id_dialog.close();
  });
