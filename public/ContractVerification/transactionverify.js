var fs = require('fs');
// Connect to a geth server over JSON-RPC
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var source= fs.readFileSync('./sol/getHash.sol','utf8',function(error,data){
  console.log("haha Sucker your error is "+data);
});
console.log("Solidity File readed successfully");


var compiled = web3.eth.compile.solidity(source);
var code = compiled.TransactionVerify.code;
var abi = compiled.TransactionVerify.info.abiDefinition;

web3.eth.contract(abi).new({from: "0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f", data: code}, function (err, contract) {
   if (!err && contract.address)
      console.log("deployed on:", contract.address);
   }
);
