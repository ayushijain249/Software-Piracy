const connection = require("./connection");

var Schema = connection.Schema;

var userSchema = new Schema({
  name: String,
  ethereumAddress: String
});
var userModel = connection.model("users", userSchema);

module.exports = userModel;
