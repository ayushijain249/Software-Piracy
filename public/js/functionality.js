window.addEventListener("load", init);

var nodeType = 'geth';
var accounts;
var defaultAccount;

function init() {
  document.getElementById("retry").hidden = true;
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    console.log('Seems to be working');
    setWeb3Version();
    doGetAccounts();
  } else {
    console.log('Injected web3 Not Found!!!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    // window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:1234'));

    // var provider = document.getElementById('provider_url').value;
    // window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }
}

function    setWeb3Version() {

  var versionJson = {};

  // Asynchronous version
  web3.version.getNode(function(error, result){
      if(!error){
          if(result.toLowerCase().includes('metamask')){
              nodeType = 'metamask';
          } else if(result.toLowerCase().includes('testrpc')){
              nodeType = 'testrpc';
          } else {
              nodeType = 'geth';
          }
      }
  });
}

function doGetAccounts() {
  web3.eth.getAccounts(function(error, result) {
    if (error) {
      console.log("Error---->" + error);
    } else {
      accounts = result;
      console.log("accounts-count" + result.length);
      // You need to have at least 1 account to proceed
      if (result.length == 0) {
        document.getElementById("retry").hidden = false;
        alert("Unlock MetaMask and press retry");
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

function retryFetch(){
  console.log(defaultAccount); 
  if (defaultAccount == null){
    location.reload();
  } 
}
