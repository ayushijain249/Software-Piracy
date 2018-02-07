window.addEventListener("load", init);

function init() {
  var userInput = document.getElementById("userInput");

  var submit = document.getElementById("submit");
  submit.addEventListener("click", buttonClicked);
}

function buttonClicked() {
  console.log("The value in the textbox is :", userInput.value);
}
