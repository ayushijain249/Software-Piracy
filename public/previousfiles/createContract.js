
var     nodeType = 'geth';

    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    var provider = document.getElementById('provider_url').value;
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  

function    doCompileSolidityContract()  {


    var source = 'contract getHash {address private hid;function set(address hidd) public{hid = hidd;}function get() public  constant returns (bytes32)           return sha256(hid); } }';
  
    console.log(flattenSource(source));

    web3.eth.compile.solidity(source, function(error, result){

        if(error){
            console.log(error);
            setData('compilation_result',error,true);
        } else {
            // This is an issue seen only on windows - solc compile binary - ignore
            result = compileResultWindowsHack(result);
            console.log('Compilation Result=',JSON.stringify(result));
            var contract_1 = '';
            var code_1 = '';
            var abi_1 = '';
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
            setData('compilation_result','Contract#1: '+contract_1,false);
            document.getElementById('compiled_bytecode').value=code_1;
            document.getElementById('compiled_abidefinition').value=JSON.stringify(abi_1);
            
        }
    });
}



