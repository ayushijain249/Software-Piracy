var accounts;
var defaultAccount;
window.addEventListener("load", function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("Injected web3 Not Found!!!");
  }
  doGetAccounts();
});

function doGetAccounts() {
  web3.eth.getAccounts(function(error, result) {
    if (error) {
      console.log("Error---->" + error);
    } else {
      accounts = result;
      console.log("accounts-count" + result.length);
      // You need to have at least 1 account to proceed
      if (result.length == 0) {
        alert("Unlock MetaMask");
        return;
      }

      var coinbase = web3.eth.coinbase;

      console.log("coinbase....." + coinbase);
      // set the default accounts
      defaultAccount = web3.eth.defaultAccount;

      console.log("default Account----- >" + defaultAccount);
      postAccountAddress();
    }
  });
}

function postAccountAddress() {
  $.ajax({
    type: "POST",
    url: "/authenticate",
    timeout: 2000,
    data: { account: defaultAccount },
    success: function(data) {
      //show content
      alert("Success!");
    },
    error: function(jqXHR, textStatus, err) {
      //show error message
      alert("text status " + textStatus + ", err " + err);
    }
  });
}
