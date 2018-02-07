var Web3 = require('web3');
var solc = require("solc");
var fs = require('fs');

// Connect to a geth server over JSON-RPC
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("Talking with a geth server", web3.version.api);
var sourceCode = fs.readFileSync('./sol/getHash.sol','utf8')
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
