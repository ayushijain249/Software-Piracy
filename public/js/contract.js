var contract_abidefinition = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
var contract_bytecode = '0x6060604052341561000c57fe5b604051602080610168833981016040528080519060200190919050505b806000819055505b505b610126806100426000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806367e0badb146044578063cd16ecbf146067575bfe5b3415604b57fe5b60516084565b6040518082815260200191505060405180910390f35b3415606e57fe5b60826004808035906020019091905050608f565b005b600060005490505b90565b60006000549050816000819055506000546001026000191681600102600019163373ffffffffffffffffffffffffffffffffffffffff167f108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce60405180905060405180910390a45b50505600a165627a7a72305820b86215323334042910c2707668d7cc3c3ec760d2f5962724042482293eba5f6b0029';
var contract_1 = '';
                var code_1 = '';
                var abi_1 = '';
                
function deployContract()    {

    
    console.log("in deploy contract method");
    if (typeof web3 !== 'undefined') {
   // if(false){  
    web3 = new Web3(web3.currentProvider);
      console.log('-------MetaMask Login-----------');
      //web3.personal.unlockAccount("web3.eth.coinbase"+web3.eth.coinbase);
    
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
    // }

    //   function    doCompileSolidityContract()  {


      
//        console.log(flattenSource(source));
        const source = "pragma solidity ^0.4.6; contract TransactionVerify"+"{"+"}";
 var compiled_code=web3.eth.compile.solidity(source, function(error, result){
    console.log("In the compilation");
            if(error){
                console.log("Compilation error="+error);
              //  setData('compilation_result',error,true);
            } else {
                // This is an issue seen only on windows - solc compile binary - ignore
                result = compileResultWindowsHack(result);
                console.log('Compilation Result=',JSON.stringify(result));
                for(var prop in result){
                    contract_1 = prop;
                    code_1 = result[prop].code;
                    if(!code_1){
                        // Test RPC returns code in result.code
                        code_1 = result.code;
                    }
                    if(result[prop].info){
                        abi_1 = result[prop].info.abiDefinition;
                    } else {
                        // Test RPC does not have the contracts :) in result
                        abi_1 = result.info.abiDefinition;
                    }
                    break;
                }
                // Populate the UI elements
                // setData('compilation_result','Contract#1: '+contract_1,false);
                // document.getElementById('compiled_bytecode').value=code_1;
                // document.getElementById('compiled_abidefinition').value=JSON.stringify(abi_1);
                
            }
        });
    // }
    
    
    
    
    /**
     * Deploys the contract - ASYNCH
     */
    
    // function    doDeployContract()   {
        // Reset the deployment results UI
        // resetDeploymentResultUI();
    
        var     abiDefinitionString =JSON.stringify(abi_1);
        var     abiDefinition = JSON.parse(abiDefinitionString);
        var bytecode=source.bytecode;
       // var     bytecode = document.getElementById('compiled_bytecode').value;
    
        // 1. Create the contract object
        var  contract = web3.eth.contract(abiDefinition);
    
        // Get the estimated gas
        var   gas = 4000;
    
        // 2. Create the params for deployment - all other params are optional, uses default
        var  params = {
            from: web3.eth.coinbase,
            data: bytecode,
            gas: gas
        }
    
        // 3. This is where the contract gets deployed
        // Callback method gets called *2* 
        // First time : Result = Txn Hash
        // Second time: Result = Contract Address
        var constructor_param = 10;
    
        contract.new(constructor_param,params,function(error,result){
    
            if(error){
                console.log('Deployment Failed: '+error);
               // setData('contracttransactionhash','Deployment Failed: '+error,true);
            } else {
                console.log('RECV:',result)
                if(result.address){
                   // document.getElementById('contractaddress').value=result.address;
                   console.log('result.address'+result.address);
                    setEtherscanIoLink('contractaddress_link','address',result.address);
                } else {
                    // gets set in the first call
                    console.log("result.transactionHash"+result.transactionHash);
                    //setData('contracttransactionhash',result.transactionHash, false);
                    setEtherscanIoLink('contracttransactionhash_link','tx',result.transactionHash);
                }
            }
        });
    }
    function    compileResultWindowsHack(result){
        var cleaned = {}
        for(var prop in result){
            var newProp = prop.replace('<stdin>:','');
            cleaned[newProp] = result[prop];
        }
        return cleaned;
    }
    































// //Compile the source code
// console.log("Compiling the source Code ");
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

// console.log("Source Code Compiled ");

//     }
// function connect(){

// }
// //Quick test the contract

// function testContract(address) {
//   // Reference to the deployed contract
//   const token = contract.at(address);
//   // Destination account for test
//   const dest_account ="0xa8228b6C1E1a859b80E4d5Cd0034C6Eb7a22142f";

//   // Assert initial account balance, should be 100000
//   const balance1 = token.balances.call(web3.eth.coinbase);
//   console.log(balance1 == 1000000);

//   // Call the transfer function
//   token.transfer(dest_account, 100, {from: web3.eth.coinbase}, (err, res) => {
//       // Log transaction, in case you want to explore
//       console.log('tx: ' + res);
//       // Assert destination account balance, should be 100 
//       const balance2 = token.balances.call(dest_account);
//       console.log(balance2 == 100);
//   });
//}
