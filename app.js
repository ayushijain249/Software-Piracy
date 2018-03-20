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
  console.log("Request received is :", request.body.address);
  userAuth.authenticate(request, response);
});

app.post("/register", (request, response) => {
  console.log("request is : ", request.body.address);
});

// ye code hatana hoga maybe...
app.post("/received", (req, res) => {
  var HID = req.body.HID;
  console.log("Data received: " + HID);
});
//----yahi tak-------//

app.post("/received", (req, res) => {
  var HID = req.body.HID;
  //var fileHash = req.body.fileHash;
  console.log("Data has been received, " + HID); //+" & "+fileHash);
  //decrypt them here and send to contract
});

app.listen(1234, function() {
  console.log("Server started...");
});

//----------database call---//

app.post("/signUp", (request, response) => {
  console.log("signup called");
  var newUser = request.body;
  //userOperations.createUser(newUser, response);
});
