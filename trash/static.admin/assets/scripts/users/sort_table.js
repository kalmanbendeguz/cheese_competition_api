function sortTable(n, id, order_type) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById(id);
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
    no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
      first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
        one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
      if (order_type == "numeric") {
        if (dir == "asc") {
          if (
            parseFloat(x.innerHTML.toLowerCase().trim()) >
              parseFloat(y.innerHTML.toLowerCase().trim()) ||
            (!isNaN(parseFloat(x.innerHTML.toLowerCase().trim())) &&
              isNaN(parseFloat(y.innerHTML.toLowerCase().trim())))
          ) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (
            parseFloat(x.innerHTML.toLowerCase().trim()) <
              parseFloat(y.innerHTML.toLowerCase().trim()) ||
            (isNaN(parseFloat(x.innerHTML.toLowerCase().trim())) &&
              !isNaN(parseFloat(y.innerHTML.toLowerCase().trim())))
          ) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      } else if (order_type == "lexicographic") {
        if (dir == "asc") {
          if (
            x.innerHTML.toLowerCase().trim() > y.innerHTML.toLowerCase().trim()
          ) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (
            x.innerHTML.toLowerCase().trim() < y.innerHTML.toLowerCase().trim()
          ) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

const lexicographic_listener = (e) =>
  sortTable(
    Array.from(e.target.parentNode.children).indexOf(e.target),
    "users_table",
    "lexicographic"
  );
const numeric_listener = (e) =>
  sortTable(
    Array.from(e.target.parentNode.children).indexOf(e.target),
    "users_table",
    "numeric"
  );

const table_user_email_header = document.querySelector(
  "#table_user_email_header"
);
table_user_email_header.addEventListener("click", lexicographic_listener);

const table_user_full_name_header = document.querySelector(
  "#table_user_full_name_header"
);
table_user_full_name_header.addEventListener("click", lexicographic_listener);

const table_user_registered_cheese_number_header = document.querySelector(
  "#table_user_registered_cheese_number_header"
);
table_user_registered_cheese_number_header.addEventListener(
  "click",
  numeric_listener
);
