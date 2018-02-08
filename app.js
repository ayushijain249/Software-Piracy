const express = require("express");
const userAuth = require("./userAuthentication");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/authenticate", (request, response) => {
  //console.log("Request received is :", request.body.userInput);
  console.log("Request received is :", request.body.account);
  userAuth.authenticate(request, response);
});

app.listen(1234, function() {
  console.log("Server started...");
});
