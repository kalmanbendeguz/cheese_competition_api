function myFunction() {
  document.getElementById("demo").innerHTML = "Paragraph changed.";
}

function myFunction2() {
  const inpObj = document.getElementById("id1");
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {
    document.getElementById("demo").innerHTML = "Input OK";
  }
}

function myFunction() {
  document.getElementById("myRadio").required = true;
  document.getElementById("demo").innerHTML =
    "The required property was set. The radio button must now be checked before submitting the form.";
}
