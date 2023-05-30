function onPasswordChange() {
  const e = document.querySelector("input[id=password]"),
    o = document.querySelector("input[id=confirm_password]");
  o.value === e.value
    ? o.setCustomValidity("")
    : o.setCustomValidity(
        document.querySelector('meta[data-name="passwords_not_match_text"]')
          .content
      );
}
const password = document.querySelector("input[id=password]"),
  confirm_password = document.querySelector("input[id=confirm_password]");
password.addEventListener("change", onPasswordChange),
  confirm_password.addEventListener("change", onPasswordChange);
