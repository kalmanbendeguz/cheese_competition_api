const on_reset_all_association_member_checkboxes_button_click = (e) => {
  const association_member_checkboxes = document.querySelectorAll(
    "input.association_member_checkbox"
  );

  for (let association_member_checkbox of association_member_checkboxes) {
    association_member_checkbox.checked = false;
  }
};

const reset_all_association_member_checkboxes_button = document.querySelector(
  "#reset_all_association_member_checkboxes_button"
);

reset_all_association_member_checkboxes_button.addEventListener(
  "click",
  on_reset_all_association_member_checkboxes_button_click
);
