window.addEventListener("load", init);

function init() {
  var submit = document.getElementById("submit");
  submit.addEventListener("click", buttonClicked);
}

function buttonClicked() {
  console.log("button clicked");
}
