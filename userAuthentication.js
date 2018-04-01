require("es6-promise").polyfill();
require("isomorphic-fetch");
var value;
var obj = {
  ainvyiAddress: "0xf809be2c525fcc878d82c54c942c5a4f7c25b6f2",
  authenticate(request, response) {
    var userAddress = request.body.address;
    console.log(userAddress);
    fetch(
      "http://ropsten.etherscan.io/api?module=account&action=txlist&address=" +
        request.body.address +
        "&startblock=0&endblock=latest&sort=dsc&apikey=CHDR8J5WRHST5ERICFH4T5TDR4NAFXSDEZ"
    )
      .then(function(data) {
        if (data.status >= 400) {
          throw new Error("Bad response from server");
        }
        return data.json();
      })
      .then(function(txlist) {
        console.log(txlist.result);
        var vendorAddress = "0xa8228b6c1e1a859b80e4d5cd0034c6eb7a22142f";
        for (tx of txlist.result) {
          if (tx.from === vendorAddress && tx.to === userAddress) {
            console.log("Status", tx.txreceipt_status);
            value = tx.txreceipt_status;
            //  response.writeHead(200, { "Content-Type": "text/html" });
            //response.sendFile("./views/hello.html", { root: __dirname });
            response.render("hello", { user: "click here" });
            break;
          }
        }
      });
  }
};

module.exports = obj;
