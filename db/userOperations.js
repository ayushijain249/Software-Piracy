var users = require("./userSchema");

var userOperations = {
  createUser: function(newUser, response) {
    let userToSave = new users(newUser);
    userToSave.save((err, doc) => {
      if (err) console.log(`Error while signing up user`, err.stack);
      else {
        console.log(`Registered User.. :-)`, doc);
        //
        response.send({ accessToken: "customer", userDetails: doc });
      }
    });
  }
};

module.exports = userOperations;
