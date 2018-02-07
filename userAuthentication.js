require("es6-promise").polyfill();
require("isomorphic-fetch");

var obj = {
  ethAddress: "0xd2d83b6e889571bb5d8f22f2ff0edfde44db5205",
  authenticate(response) {
    fetch(
      "http://ropsten.etherscan.io/api?module=account&action=txlist&address=" +
        this.ethAddress +
        "&startblock=0&endblock=99999999&sort=dsc&apikey=YourApiKeyToken"
    )
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(txlist) {
        //  console.log(txlist);
        var userFrom = "0xf809be2c525fcc878d82c54c942c5a4f7c25b6f2";
        var userTo = "0xd2d83b6e889571bb5d8f22f2ff0edfde44db5205";
        for (tx of txlist.result) {
          if (tx.from === userFrom && tx.to === userTo) {
            console.log("Status", tx.txreceipt_status);
          }
        }
      });

    var value = 1;
    if (value == 1) {
      console.log("Dekhoo", __dirname);
      response.sendFile("./views/hello.html", { root: __dirname });
    }
  }
};

module.exports = obj;
