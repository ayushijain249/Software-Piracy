function deployContract1()    {

    
    console.log("in deploy contract method");
    if (typeof web3 !== 'undefined') {
   // if(false){  
    web3 = new Web3(web3.currentProvider);
   //   console.log('-------MetaMask Login-----------');
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

      var abcContract = web3.eth.contract([]);
      console.log("abcContract="+abcContract);
      var testerContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"y","type":"uint256"}],"name":"setX","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"l","type":"string"}],"name":"setSoftwareLicense","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getX","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"h","type":"string"}],"name":"setHID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSoftwareHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSoftwareLicense","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"s","type":"string"}],"name":"setSoftwareHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getHID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
      var tester = testerContract.new(
         {
           from: web3.eth.accounts[0], 
           data: '0x6060604052341561000f57600080fd5b73158386314f1dbf4760e2c8bc604ac2c3feea5a2e600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550736040b6e5a5306f705358d07b79487908b57001a6600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600a600081905550606060405190810160405280604081526020017f633564366462666536343436626466326132643566363636336139636663353581526020017f3736336565653963353837646261326366336531393832663633303936323964815250600190805190602001906101339291906101f8565b506040805190810160405280601381526020017f414657322d414453342d554955312d554f4239000000000000000000000000008152506003908051906020019061017f9291906101f8565b50606060405190810160405280604081526020017f663464383733306339623934666237613566313234623866383563636332613681526020017f3037316430323564653538616361323037353437326433623738626638333838815250600290805190602001906101f29291906101f8565b5061029d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023957805160ff1916838001178555610267565b82800160010185558215610267579182015b8281111561026657825182559160200191906001019061024b565b5b5090506102749190610278565b5090565b61029a91905b8082111561029657600081600090555060010161027e565b5090565b90565b610bd9806102ac6000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634018d9aa14610093578063496facb6146100b65780635197c7aa1461018c5780636572b0a4146101b5578063754576901461028b5780637a9beffc14610319578063ac37afa1146103a7578063e5b845901461047d575b600080fd5b341561009e57600080fd5b6100b4600480803590602001909190505061050b565b005b34156100c157600080fd5b610111600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610515565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610151578082015181840152602081019050610136565b50505050905090810190601f16801561017e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561019757600080fd5b61019f61061b565b6040518082815260200191505060405180910390f35b34156101c057600080fd5b610210600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610681565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610250578082015181840152602081019050610235565b50505050905090810190601f16801561027d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561029657600080fd5b61029e610787565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102de5780820151818401526020810190506102c3565b50505050905090810190601f16801561030b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561032457600080fd5b61032c61088b565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036c578082015181840152602081019050610351565b50505050905090810190601f1680156103995780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103b257600080fd5b610402600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061098f565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610442578082015181840152602081019050610427565b50505050905090810190601f16801561046f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561048857600080fd5b610490610a95565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104d05780820151818401526020810190506104b5565b50505050905090810190601f1680156104fd5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060008190555050565b61051d610b99565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561057957600080fd5b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561060f5780601f106105e45761010080835404028352916020019161060f565b820191906000526020600020905b8154815290600101906020018083116105f257829003601f168201915b50505050509050919050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561067957600080fd5b600054905090565b610689610b99565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106e557600080fd5b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561077b5780601f106107505761010080835404028352916020019161077b565b820191906000526020600020905b81548152906001019060200180831161075e57829003601f168201915b50505050509050919050565b61078f610b99565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107eb57600080fd5b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108815780601f1061085657610100808354040283529160200191610881565b820191906000526020600020905b81548152906001019060200180831161086457829003601f168201915b5050505050905090565b610893610b99565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108ef57600080fd5b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109855780601f1061095a57610100808354040283529160200191610985565b820191906000526020600020905b81548152906001019060200180831161096857829003601f168201915b5050505050905090565b610997610b99565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109f357600080fd5b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a895780601f10610a5e57610100808354040283529160200191610a89565b820191906000526020600020905b815481529060010190602001808311610a6c57829003601f168201915b50505050509050919050565b610a9d610b99565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610af957600080fd5b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b8f5780601f10610b6457610100808354040283529160200191610b8f565b820191906000526020600020905b815481529060010190602001808311610b7257829003601f168201915b5050505050905090565b6020604051908101604052806000815250905600a165627a7a723058209942b102092ee06d6094552543f7bf7d500309b833a23b6ca1cd47bee659614e0029', 
           gas: '4700000'
         }, function (e, contract){
          console.log(e, contract);
          if (typeof contract.address !== 'undefined') {
               console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
          }
       }) 
       
       
     }
     function  deployContract2(){
        var spcontract=web3.eth.contract([
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ],
                "name": "setX",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "l",
                        "type": "string"
                    }
                ],
                "name": "setSoftwareLicense",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "getX",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "h",
                        "type": "string"
                    }
                ],
                "name": "setHID",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getSoftwareHash",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getSoftwareLicense",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "s",
                        "type": "string"
                    }
                ],
                "name": "setSoftwareHash",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getHID",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ]);
        var add="0x07d42dd5e3ac80b4b3f72caea1923f7962b5a33f";
        var spco=spcontract.at(add);
        var gas=4000;
        var value={
            from:web3.eth.defaultAccount,
            gas:gas
        }
        console.log("software hash is setting="+spco.setSoftwareHash("abcde",value,function(error,result){
            if(!error)
            console.log("result of set method="+result);
            else console.error("error="+error);
        }));
// var value1={

// }
        console.log("software hash is getting="+spco.getSoftwareHash(value,function(error,result){
            if(!error)
            console.log("result of get method="+result);
            else console.error("error="+error);
        }));
        
    
     }