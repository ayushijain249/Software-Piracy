require("es6-promise").polyfill();
require("isomorphic-fetch");

var obj = {
  ainvyiAddress: "0xf809be2c525fcc878d82c54c942c5a4f7c25b6f2",
  authenticate(request, response) {
    fetch(
      "http://ropsten.etherscan.io/api?module=account&action=txlist&address=" +
        this.ethAddress +
        "&startblock=0&endblock=99999999&sort=dsc&apikey=CHDR8J5WRHST5ERICFH4T5TDR4NAFXSDEZ"
    )
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(txlist) {
        vendorAddress = "0xf809be2c525fcc878d82c54c942c5a4f7c25b6f2";
        for (tx of txlist.result) {
          if (
            tx.from === this.vendorAddress &&
            tx.to === request.body.account
          ) {
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
