require("es6-promise").polyfill();
require("isomorphic-fetch");

var obj = {
	ainvyiAddress: "0xf809be2c525fcc878d82c54c942c5a4f7c25b6f2",
	authenticate(request, response) {
    var value;
		var userAddress = request.body.account;
		// console.log(userAddress);
		fetch(
			"http://ropsten.etherscan.io/api?module=account&action=txlist&address=" +
				request.body.account +
				"&startblock=0&endblock=latest&sort=dsc&apikey=CHDR8J5WRHST5ERICFH4T5TDR4NAFXSDEZ"
		)
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(function(txlist) {
				vendorAddress = "0x0ad2dfce0b4b5f76a88b660bbb61b102c10ca6e1";
				for (tx of txlist.result) {
					if (
						tx.from === this.vendorAddress &&
						tx.to === userAddress
					) {
            console.log("Status", tx.txreceipt_status);
            value = tx.txreceipt_status;
            break;
					}
				}
			});

		if (value == 1) {
			// console.log("Dekhoo", __dirname);
			response.sendFile("./views/hello.html", { root: __dirname });
		}
	}
};

module.exports = obj;
