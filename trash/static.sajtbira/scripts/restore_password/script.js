function on_password_change() {
  const e = document.querySelector("input[id=new_password]"),
    n = document.querySelector("input[id=confirm_new_password]");
  n.value === e.value
    ? n.setCustomValidity("")
    : n.setCustomValidity(
        document.querySelector('meta[data-name="passwords_not_match_text"]')
          .content
      );
}
const new_password = document.querySelector("input[id=new_password]"),
  confirm_new_password = document.querySelector(
    "input[id=confirm_new_password]"
  );
new_password.addEventListener("change", on_password_change),
  confirm_new_password.addEventListener("change", on_password_change);
