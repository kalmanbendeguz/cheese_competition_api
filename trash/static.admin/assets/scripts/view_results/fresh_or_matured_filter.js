// get states from cookie and set row visibilities
const maturation_time_types = { fresh: "true", matured: "true" };

for (let type of Object.keys(maturation_time_types)) {
  maturation_time_types[type] =
    get_cookie(`view_results_show_${type}`) ?? maturation_time_types[type];
}

const rows_of_view_results_table = document.querySelectorAll(
  "#view_results_table tr"
);

for (let row of rows_of_view_results_table) {
  for (let [type, value] of Object.entries(maturation_time_types)) {
    if (row.hasAttribute(type))
      row.style.display = value === "true" ? "" : "none";
  }
}
///

// set checkbox states and add listeners
const filter_checkboxes = document.querySelectorAll(
  "input[maturation_time_type_filter]"
);

for (let filter_checkbox of filter_checkboxes) {
  filter_checkbox.checked =
    maturation_time_types[filter_checkbox.value] === "true";
  filter_checkbox.addEventListener("click", on_filter_checkbox_click);
}
///

function on_filter_checkbox_click(e) {
  // get all columns belonging to this checkbox
  const rows_of_checkbox = document.querySelectorAll(`tr[${e.target.value}]`);

  // make their visibility to the state of the checkbox
  for (let row of rows_of_checkbox) {
    e.target.checked ? (row.style.display = "") : (row.style.display = "none");
  }

  // save to cookie
  document.cookie = `view_results_show_${e.target.value}=${e.target.checked}; max-age=34560000;`;
}

function get_cookie(cookieName) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
