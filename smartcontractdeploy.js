
let Web3=require('web3');
let solc=require('solc');
console.log("Running Somethingoutside ");


var methods={};
// Connect to local Ethereum node
//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

methods.deploy=function(response){
	console.log("response"+response);

	if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	console.log('-------MetaMask Login-----------');
	web3.personal.unlockAccount(web3.eth.coinbase);

	console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
  } else {
	  
	console.log('No Web3 Detected... using HTTP Provider');
		web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

  }
          
  console.log("web3.version.api="+web3.version.api);
		  web3.eth.defaultAccount = web3.eth.accounts[0];
				console.log("Default Account is ="+web3.eth.defaultAccount+"\n");
               console.log(web3.eth.getBalance(web3.eth.defaultAccount,web3.eth.defaultBlock,function(error,result){
           // Convert the balance to ethers
            var bal = web3.fromWei(result,'ether').toFixed(2);
			console.log("Balance is "+bal);
		}
	));
//return module;
};
module.exports = methods;

// //Compile the source code
// const input = "contract TransactionVerify"+"{"+"}";
// const output = solc.compile(input.toString(), 1);
// const bytecode = output.contracts['TransactionVerify'].bytecode;
// const abi = JSON.parse(output.contracts['TransactionVerify'].interface);

// // Contract object
// const contract = web3.eth.contract(abi);

// // Deploy contract instance
// const contractInstance = contract.new({
//     data: '0x' + bytecode,
//     from: web3.eth.coinbase,
//     gas: 90000*2
// }, (err, res) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     // Log the tx, you can explore status with eth.getTransaction()
//     console.log(res.transactionHash);

//     // If we have an address property, the contract was deployed
//     if (res.address) {
//         console.log('Contract address: ' + res.address);
//         // Let's test the deployed contract
//       //  testContract(res.address);
//     }
// });
// }
// Quick test the contract

// function testContract(address) {
//     // Reference to the deployed contract
//     const token = contract.at(address);
//     // Destination account for test
//     const dest_account ="0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f";

//     // Assert initial account balance, should be 100000
//     const balance1 = token.balances.call(web3.eth.coinbase);
//     console.log(balance1 == 1000000);

//     // Call the transfer function
//     token.transfer(dest_account, 100, {from: web3.eth.coinbase}, (err, res) => {
//         // Log transaction, in case you want to explore
//         console.log('tx: ' + res);
//         // Assert destination account balance, should be 100 
//         const balance2 = token.balances.call(dest_account);
//         console.log(balance2 == 100);
//     });
// }
