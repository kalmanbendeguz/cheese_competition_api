function myFunction() {
  document.getElementById("demo").innerHTML = "Paragraph changed.";
}
function myFunction2() {
  const e = document.getElementById("id1");
  e.checkValidity()
    ? (document.getElementById("demo").innerHTML = "Input OK")
    : (document.getElementById("demo").innerHTML = e.validationMessage);
}
function myFunction() {
  (document.getElementById("myRadio").required = !0),
    (document.getElementById("demo").innerHTML =
      "The required property was set. The radio button must now be checked before submitting the form.");
}
