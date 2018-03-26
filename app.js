const express = require("express");
const userAuth = require("./userAuthentication");
const bodyParser = require("body-parser");
const userOperations = require("./db/userOperations");
const ejs = require("ejs");
const fs = require("fs");
const jre = require('node-jre');
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

app.post("/emailCheck", (request, response) => {
  console.log(request.body);
  userOperations.checkEmail(request.body.email, response);
});

// ye code nahi hatana hoga ...
app.post("/loginClient", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var HID = req.body.HID;
  console.log(`\nEmail: ${email}\nPassword: ${password}\nHID: ${HID}`);

  //verify user form database
  userOperations.verifyUser({ email: email, password: password }, res);

  //check from database and then:
  var valid = "Yes";// Yes for valid and No for invalid.
  //after deployment of contract (done during registration)...
  var mmAddress = "MetaMaskAddressFromAfterTheRegistrationProcess";
  var contractAddress = "ContractAddress";
  var fileName = "user"+email+".ini";
  fs.writeFileSync("./public/"+fileName,mmAddress+"\r\n"+contractAddress);
  console.log("file successfully created.")
  var files = ["./public/"+fileName];//, "./public/SnakeGame.exe"];

  //creating FID...
  var FID = jre.spawnSync(  // call synchronously
    ['java'],                // add the relative directory 'java' to the class-path
    'FID',                 // call main routine in class 'FID'
    files,               // pass files as parameters
    { encoding: 'utf8' }     // encode output as string
  ).stdout.trim();           // take output from stdout as trimmed String
  console.log("FID: "+FID);
  
  //set HID and FID in the contract here...

  res.write(valid+","+variables.fileName,() => {  //fileName coz the setup will download this file...
    console.log(valid);
  });
  //aage ka code yaha pe
  //console.log(res.connection.address());
});

app.post("/setupComplete", (req, res) =>{
  //delete the 
  var fileName = "user"+req.body.email+".ini";
  console.log(req.body.id);
  if(req.body.id!='bsakfo13431fsa')
   return;
  var file = "./public/"+fileName;
  fs.unlink(file,(err)=>{
    if(err)
      console.log("Failed to delete file..."+fileName);
    else
      console.log("Installation finished.");
  });
});

// edwin ka code khatam

app.listen(1234, function() {
  console.log("Server started...");
});
