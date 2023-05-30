function on_password_change() {
  const new_password = document.querySelector("input[id=new_password]");
  const confirm_new_password = document.querySelector(
    "input[id=confirm_new_password]"
  );

  if (confirm_new_password.value === new_password.value) {
    confirm_new_password.setCustomValidity("");
  } else {
    confirm_new_password.setCustomValidity("A jelszavak nem egyeznek.");
  }
}

const new_password = document.querySelector("input[id=new_password]");
const confirm_new_password = document.querySelector(
  "input[id=confirm_new_password]"
);

new_password.addEventListener("change", on_password_change);
confirm_new_password.addEventListener("change", on_password_change);
