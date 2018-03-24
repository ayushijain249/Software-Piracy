

var Web3 = require('web3');

//console.log("Web3="+Web3);
var http=require('http');
var solc = require("solc");
//console.log("solc="+solc);

var fs = require('fs');
http.createServer(show).listen(1337);

// Connect to a geth server over JSON-RPC

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//console.log("web3="+web3);

console.log("Talking with a geth server"+ web3.version.api);
function show(req,res){
console.log("server started");
  res.end("Talking with a geth server"+ web3.version.api);
}
web3.eth.getTransactionReceipt("0xfc090232e31c384acbdf3896dc2f092e5c2d40e79ebb5b7a76e7326c9062c011");


var sourceCode = fs.readFileSync('./sol/TransactionVerify.sol','utf8',function(error,data){
  console.log("haha Sucker your error is "+data);
});
console.log("Solidity File readed successfully");
var compiled = solc.compile(sourceCode);
var abiArray = compiled.contracts["MyToken"].interface;
abiArray = JSON.parse(abiArray);

// Create a proxy object to access the smart contract
var MyContract = web3.eth.contract(abiArray);

// instantiate by address
var address = "0x091cc7F4ACA751a6b8A4101715d6B07CD4232341";
var contractInstance = MyContract.at(address);

// All public variables have automatically generated getters
// http://bitcoin.stackexchange.com/a/38079/5464
var result = {
"totalSupply": contractInstance.totalSupply(),
"symbol": contractInstance.symbol(),
"name": contractInstance.name(),
};
console.log(JSON.stringify(result));



