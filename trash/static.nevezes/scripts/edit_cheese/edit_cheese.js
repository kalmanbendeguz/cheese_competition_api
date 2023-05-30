window.onbeforeunload = function () {
  return !0;
};
const milkTypeRadioButtons = document.querySelectorAll(
  "input[name=milk_type][type=radio]"
);
for (let e of milkTypeRadioButtons)
  e.addEventListener("change", onMilkTypeRadioButtonChange);
function onMilkTypeRadioButtonChange(e) {
  const t = document.querySelectorAll("select.product_category_list");
  for (let e of t) e.removeAttribute("required"), (e.disabled = {});
  const o = document.querySelector(`#product_category_list_${e.target.id}`);
  (o.required = {}), o.removeAttribute("disabled");
  const r = document.querySelectorAll("div.select_category");
  for (let e of r) {
    const t = e.querySelectorAll("option");
    for (let e of t) e.removeAttribute("selected");
    (e.querySelector("option[value='']").selected = {}), (e.hidden = {});
  }
  const i = document.querySelector(`div[id=select_category_${e.target.id}]`);
  (i.querySelector("option[value='']").selected = {}),
    i.removeAttribute("hidden");
}
const maturationTimeRadioButtons = document.querySelectorAll(
  "input[name=maturation_time_type][type=radio]"
);
for (let e of maturationTimeRadioButtons)
  e.addEventListener("change", onMaturationTimeRadioButtonChange);
function onMaturationTimeRadioButtonChange(e) {
  const t = document.querySelector("div[id=maturation_time_matured_block]"),
    o = document.querySelector("input[id=maturation_time_quantity]"),
    r = document.querySelector("select[id=maturation_time_unit]");
  if (
    ("fresh" === e.target.value &&
      ((t.hidden = {}),
      o.removeAttribute("required"),
      r.removeAttribute("required"),
      (o.disabled = {}),
      (r.disabled = {})),
    "matured" === e.target.value)
  ) {
    t.removeAttribute("hidden"),
      (o.required = {}),
      (r.required = {}),
      (o.value = "");
    (r.querySelector("option[value='']").selected = {}),
      o.removeAttribute("disabled"),
      r.removeAttribute("disabled");
  }
}
const milkTypeSelects = document.querySelectorAll(
  "select.product_category_list"
);
for (let e of milkTypeSelects)
  e.addEventListener("focus", onMilkTypeSelectFocus);
for (let e of milkTypeSelects)
  e.addEventListener("focusout", onMilkTypeSelectFocusOut);
function onMilkTypeSelectFocus(e) {
  for (let e of milkTypeSelects) {
    const t = e.options[e.selectedIndex].getAttribute("depth") ?? 0;
    if (0 === e.selectedIndex) return;
    e.options[e.selectedIndex].innerHTML =
      "&nbsp;".repeat(3 * t + 1) + e.options[e.selectedIndex].text.trim();
  }
}
function onMilkTypeSelectFocusOut(e) {
  e.target.options[e.target.selectedIndex].text =
    e.target.options[e.target.selectedIndex].text.trim();
}
const edit_cheese_form = document.querySelector("form[id=edit_cheese_form]");
function on_edit_cheese_form_submit(e) {
  window.onbeforeunload = null;
}
edit_cheese_form.addEventListener("submit", on_edit_cheese_form_submit);
