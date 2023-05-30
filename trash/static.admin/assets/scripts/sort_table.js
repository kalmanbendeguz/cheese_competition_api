function sort_table(column_index, table) {
  let rows = table.rows;
  if (rows.length <= 2) return;

  let rows_to_sort = Array.from(rows).slice(1); // skip the header row
  let sort_type = rows[0].cells[column_index].getAttribute("data_sort");

  const first_content_before_sort =
    rows_to_sort[0].cells[column_index].textContent.trim();

  if (
    rows_to_sort.every(
      (row) =>
        row.cells[column_index].textContent.trim() ===
        rows_to_sort[0].cells[column_index].textContent.trim()
    )
  )
    return;

  const sorter = function (direction) {
    return function (a, b) {
      let a_content = a.cells[column_index].textContent.trim();
      let b_content = b.cells[column_index].textContent.trim();

      if (sort_type === "numeric") {
        if (!isNaN(a_content) && isNaN(b_content)) return -1;
        if (isNaN(a_content) && !isNaN(b_content)) return 1;
        if (isNaN(a_content) && isNaN(b_content))
          return direction * a_content.localeCompare(b_content);
        return direction * (Number(a_content) - Number(b_content));
      } else if (sort_type === "lexicographic") {
        return direction * a_content.localeCompare(b_content);
      } else {
        return direction * a_content.localeCompare(b_content);
      }
    };
  };

  rows_to_sort.sort(sorter(1));

  const first_content_after_sort =
    rows_to_sort[0].cells[column_index].textContent.trim();

  if (first_content_before_sort === first_content_after_sort) {
    rows_to_sort.sort(sorter(-1));
  }

  table.tBodies[0].innerHTML = "";
  rows_to_sort.forEach(function (row) {
    table.tBodies[0].appendChild(row);
  });
}

let headers = document.querySelectorAll("th[data_sort]");
headers.forEach(function (header, index) {
  const table = header.closest("table");
  header.addEventListener("click", function () {
    sort_table(index, table);
  });
});
