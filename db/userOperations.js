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
  },
  verifyUser: function(oldUser) {
    users.findOne({ email: oldUser.email }, function(err, user) {
      if (err) {
        console.log("user doesnot exist!!");
        throw err;
      }
      // test a matching password
      user.comparePassword(oldUser.password, function(err, isMatch) {
        if (err) throw err;
        console.log("Password matching:", isMatch);
      });
    });
  }
};

module.exports = userOperations;
