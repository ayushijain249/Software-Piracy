var users = require("./userSchema");

var userOperations = {
  createUser: function(newUser, response) {
    let userToSave = new users(newUser);
    userToSave.save((err, doc) => {
      if (err) {
        console.log(`Error while signing up user`, err.stack);
        if (err.name == "BulkWriteError") {
          console.log("--------------duplicate email id -------");
          response.status(400).send({
            message: "email id already exists.Enter unique email id."
          });
        } else
          response
            .status(500)
            .send({ message: "some error occured while registering..." });
      } else {
        console.log(`Registered User.. :-)`, doc);
        //response.send({ accessToken: "customer", userDetails: doc });
        response.status(201).send({ message: "user registered succesfully." });
      }
    });
  },
  checkEmail: function(emailId, response) {
    users.findOne({ email: emailId }, function(err, user) {
      if (err) {
        console.log("Some Error--->" + err);
        response
          .status(500)
          .send({ message: "some error occured while verifying..." });
      }
      if (user && user != null) {
        console.log("email exists");
        response.status(400).send({
          message: "email id already exists.Enter unique email id."
        });
      } else {
        console.log("email does not exists");
        response.status(200).send({ message: "Email is verfied..." });
      }
    });
  },
  verifyUser: function(oldUser, response) {
    users.findOne({ email: oldUser.email }, function(err, user) {
      if (err) {
        console.log("some error!!" + err);
        response
          .status(500)
          .send({ message: "some error occured while authenticating..." })
          ;
      }
      // test a matching password
      if (user && user != null) {
        user.comparePassword(oldUser.password, function(err, isMatch) {
          if (err) {
            console.log("error" + err);
            response
              .status(500)
              .send({ message: "some error occured while authenticating..." })
              ;
          }
          console.log("Password matching:", isMatch);
          if (isMatch) {
            console.log("its a match");
            response.status(200).send({ message: "User authenticated" });
          } else {
            console.log("its not a match");
            response.status(401).send({
              message: "Ivalid Password.You are not authorised."
            });
          }
        });
      } else {
        console.log("user doesn't exist");
        response.status(401).send({
          message: "Invalid Email.You are not authorised."
        });
      }
    });
  }
};

module.exports = userOperations;
