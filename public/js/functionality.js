window.addEventListener("load", init);

var nodeType = 'geth';
var address;

function init() {
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

function doGetAccounts(){
  web3.eth.getAccounts(function(error, result){
    if(error){
      console.log('accounts count returned an error');
    } else{
      console.log(result.length);
      //result[0] gives the current account
      console.log(result[0]);
      address = result[0];
      //You need to have at least 1 account to proceed
      if(result.length == 0) {
        if(nodeType == 'metamask'){
            alert('Unlock MetaMask and press retry');
        }
        return;
      }
    }
  });
}

function buttonClicked() {
   console.log("The value in the textbox is :", userInput.value);
 }

function retryFetch(){
  console.log(address); 
  if (address == null){
    location.reload();
  } else{
     //code to continue with the validation process here
    authenticate(address);
   }
}

 function authenticate(){

 }