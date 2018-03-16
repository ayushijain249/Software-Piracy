const express = require("express");
const userAuth = require("./userAuthentication");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.post("/authenticate", (request, response) => {
  //console.log("Request received is :", request.body.userInput);
  console.log("Request received is :", request.body.account);
  userAuth.authenticate(request, response);
});
// ye code hatana hoga maybe...
app.post("/received", (req, res) => {
  var HID = req.body.HID;
  console.log("Data received: " + HID);
});
//----yahi tak-------//

app.listen(1234, function() {
  console.log("Server started...");
});
