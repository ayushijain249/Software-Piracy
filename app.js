const express = require('express')
const app = express();

app.use(express.static("public"));

app.listen(1234,function(){
    console.log("Server started...");
});