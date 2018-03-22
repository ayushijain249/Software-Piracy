const express = require("express");
const userAuth = require("./userAuthentication");
const bodyParser = require("body-parser");
const userOperations = require("./db/userOperations");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.post("/authenticate", (request, response) => {
  //console.log("Request received is :", request.body.userInput);
  console.log("Request received is :", request.body);
  //userAuth.authenticate(request, response);
});

app.post("/register", (request, response) => {
  console.log("request is : ", request.body);
  var newUser = request.body;
  userOperations.createUser(newUser, response);
});

// ye code nahi hatana hoga ...
app.post("/loginClient", (req, res) =>{
  var email = req.body.email;
  var password = req.body.password;
  var HID = req.body.HID;
  console.log(`\nEmail: ${email}\nPassword: ${password}\nHID: ${HID}`);
  // yaha database checking ka code likho
  //check from database and then:
  var valid = "Yes";// Yes for valid and No for invalid.
  res.write(valid,() => {
    console.log(valid);
  });
  //aage ka code yaha pe
  console.log(res.connection.address());
});
// edwin ka code khatam

app.listen(1234, function() {
  console.log("Server started...");
});

//----------database call---//

app.post("/signUp", (request, response) => {
  console.log("signup called");
  var newUser = request.body;
  //userOperations.createUser(newUser, response);
});
