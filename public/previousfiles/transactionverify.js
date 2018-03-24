var fs = require('fs');
// Connect to a geth server over JSON-RPC
var Web3 = require('web3');
var solc=require('solc');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var source= fs.readFileSync('./sol/TransactionVerify.sol','utf8',function(error,data){
  console.log("haha Sucker your error is "+data);
});
console.log("Solidity File readed successfully");

//var  source='contract TransactionVerify{address private hid;function set(address hidd) public{ hid = hidd;}function get() public  constant returns (bytes32)  { return sha256(hid);}}'
//console.log("source file is ="+source);
//DEPLOYING FROM 0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f
var compiled = web3.eth.compile.solidity(source);

console.log('compiled succesfully');

var code = compiled.code;
//console.log("code="+code);
//var abi=compiled.abi;
var abi =compiled.abi;
//console.log("abi="+abi);

// var check=web3.eth.Contract(abi).at('0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f');
// console.log(check);

console.log("Default Account is ="+web3.eth.accounts[0]+"\n");

//console.log("Default Account is ="+web3.eth.accounts[0]+"\n");

var myContract = new web3.eth.Contract(abi, {
  from: "0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f", data: code}, 
    function (err, contract) {
     if (!err && contract.address)
        console.log("deployed on:", contract.address);
     });


// web3.eth.contract(abi,
//   {from: "0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f", data: code}, 
//   function (err, contract) {
//    if (!err && contract.address)
//       console.log("deployed on:", contract.address);
//    }
// );
var spContract=myContract.at('0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f');
	console.log("spContract="+spContract)+"\n";
	
	//spContract.set(7257652);
	console.log("Data Setting is = "+spContract.set(1211));

	console.log("\nData Getting is ="+spContract.get());
	
