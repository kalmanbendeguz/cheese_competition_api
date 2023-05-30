window.onbeforeunload = function () {
  return true;
};

const milkTypeRadioButtons = document.querySelectorAll(
  "input[name=milk_type][type=radio]"
);

milkTypeRadioButtons.forEach((radioButton) =>
  radioButton.addEventListener("change", onMilkTypeRadioButtonChange)
);

function onMilkTypeRadioButtonChange(e) {
  const selectCategories = document.querySelectorAll(
    "select.product_category_list"
  );
  selectCategories.forEach((selectCategory) => {
    selectCategory.removeAttribute("required");
    selectCategory.disabled = {};
  });

  const activeCategory = document.querySelector(
    `#product_category_list_${e.target.id}`
  );
  activeCategory.required = {};
  activeCategory.removeAttribute("disabled");

  const selectGroups = document.querySelectorAll("div.select_category");

  selectGroups.forEach((selectGroup) => {
    const allOptions = selectGroup.querySelectorAll(`option`);
    allOptions.forEach((currentOption) =>
      currentOption.removeAttribute("selected")
    );
    const firstSelected = selectGroup.querySelector(`option[value='']`);
    firstSelected.selected = {};
    selectGroup.hidden = {};
  });

  const activeGroup = document.querySelector(
    `div[id=select_category_${e.target.id}]`
  );
  const firstSelected = activeGroup.querySelector(`option[value='']`);
  firstSelected.selected = {};
  activeGroup.removeAttribute("hidden");
}

const maturationTimeRadioButtons = document.querySelectorAll(
  "input[name=maturation_time_type][type=radio]"
);

maturationTimeRadioButtons.forEach((radioButton) =>
  radioButton.addEventListener("change", onMaturationTimeRadioButtonChange)
);

function onMaturationTimeRadioButtonChange(e) {
  const maturationTimeSelectBlock = document.querySelector(
    "div[id=maturation_time_matured_block]"
  );
  const maturationTimeQuantityInput = document.querySelector(
    "input[id=maturation_time_quantity]"
  );
  const selectMaturationTimeUnit = document.querySelector(
    "select[id=maturation_time_unit]"
  );

  if (e.target.value === "fresh") {
    maturationTimeSelectBlock.hidden = {};
    maturationTimeQuantityInput.removeAttribute("required");
    selectMaturationTimeUnit.removeAttribute("required");

    maturationTimeQuantityInput.disabled = {};
    selectMaturationTimeUnit.disabled = {};
  }
  if (e.target.value === "matured") {
    maturationTimeSelectBlock.removeAttribute("hidden");
    maturationTimeQuantityInput.required = {};
    selectMaturationTimeUnit.required = {};

    maturationTimeQuantityInput.value = "";
    const firstSelected =
      selectMaturationTimeUnit.querySelector(`option[value='']`);
    firstSelected.selected = {};

    maturationTimeQuantityInput.removeAttribute("disabled");
    selectMaturationTimeUnit.removeAttribute("disabled");
  }
}

/////////////////////////////////////////////////////

const milkTypeSelects = document.querySelectorAll(
  "select.product_category_list"
);

milkTypeSelects.forEach((milkTypeSelect) =>
  milkTypeSelect.addEventListener("focus", onMilkTypeSelectFocus)
);
milkTypeSelects.forEach((milkTypeSelect) =>
  milkTypeSelect.addEventListener("focusout", onMilkTypeSelectFocusOut)
);

function onMilkTypeSelectFocus(e) {
  const space = "&nbsp;";
  milkTypeSelects.forEach((milkTypeSelect) => {
    const depth =
      milkTypeSelect.options[milkTypeSelect.selectedIndex].getAttribute(
        "depth"
      ) ?? 0;
    if (milkTypeSelect.selectedIndex === 0) return;
    milkTypeSelect.options[milkTypeSelect.selectedIndex].innerHTML =
      space.repeat(depth * 3 + 1) +
      milkTypeSelect.options[milkTypeSelect.selectedIndex].text.trim();
  });
}

function onMilkTypeSelectFocusOut(e) {
  e.target.options[e.target.selectedIndex].text =
    e.target.options[e.target.selectedIndex].text.trim();
}

const edit_cheese_form = document.querySelector("form[id=edit_cheese_form]");

edit_cheese_form.addEventListener("submit", on_edit_cheese_form_submit);

function on_edit_cheese_form_submit(e) {
  window.onbeforeunload = null;
}
