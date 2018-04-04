window.addEventListener("load", fetchUndeployedContracts);
var contractsData = [];

function fetchUndeployedContracts() {
  
  $.ajax({
    type: "POST",
    url: "http://localhost:1234/unDeployedContracts",
    timeout: 20000,
    statusCode: {
      200: function(data) {
        console.log(JSON.stringify(data));
        contractsData = data;
        updateList();
      },
      400: function(data) {
        console.log("400--->" + data.responseText);
      },
      500: function(data) {
        alert("500-->" + data.responseText);
        console.log("500--->" + data.responseText);
      }
    },
    success: function(data) {
      console.log("Data received");

      /*var str = "<ul>";
      for (i in results) {
        str +=
          "<li>" +
          results[i].email +
          "<button  onclick='deployThis()'>Deploy</button></li>";
      }
      str += "</ul>";*/
    },
    error: function(data) {}
  });
}

function updateList() {
  var str = "<ul>";
  for (i in contractsData) {
    str +=
      "<li>" +
      contractsData[i].email +
      "<button id='contractsData[i].email' onClick=deployContract(contractsData[i])>Deploy</button></li>";
  }
  str += "</ul>";
  $("#list").append(str);
}

function fetchContractData() {
  emailId = "ayu00789@gmail.com";
  $.ajax({
    type: "POST",
    url: "http://localhost:1234/contractData",
    timeout: 20000,
    data: { email: emailId },
    statusCode: {
      200: function(data) {
        console.log(data);
        deployContract(emailId, data);
      },
      400: function(data) {
        console.log("400--->" + data.responseText);
      },
      500: function(data) {
        alert("500-->" + data.responseText);
        console.log("500--->" + data.responseText);
      }
    },
    success: function(data) {},
    error: function(data) {}
  });
}

function deployContract(data) {
  console.log("in deploy contract method");
  if (typeof web3 !== "undefined") {
    // if(false){
    web3 = new Web3(web3.currentProvider);
    console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
  } else {
    console.log("No Web3 Detected... using HTTP Provider");
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  var testerContract = web3.eth.contract(JSON.parse(data.abi));
  console.log(testerContract);
  var byteCode = "0x" + data.byteCode;
  var tester = testerContract.new(
    {
      from: web3.eth.accounts[0],
      data: byteCode,
      gas: "4700000"
    },
    function(e, contract) {
      console.log(e, contract);
      if (typeof contract.address !== "undefined") {
        console.log(
          "Contract mined! address: " +
            contract.address +
            " transactionHash: " +
            contract.transactionHash
        );
        sendContractAddress(data.email, contract.address);
      }
    }
  );
}

function sendContractAddress(emailId, contractAdd) {
  var sendData = {
    email: emailId,
    contractAddress: contractAdd
  };
  console.log(sendData.email + "  " + sendData.contractAddress);
  $.ajax({
    type: "POST",
    url: "http://localhost:1234/contractAddress",
    timeout: 20000,
    data: sendData,
    statusCode: {
      200: function(data) {
        console.log(data);
        alert("contract deployed succesfully...");
        location.reload(true);
      },
      400: function(data) {
        console.log("400--->" + data.responseText);
      },
      500: function(data) {
        alert("500-->" + data.responseText);
        console.log("500--->" + data.responseText);
      }
    },
    success: function(data) {},
    error: function(data) {}
  });
}

function deployContract1() {
  console.log("in deploy contract method");
  if (typeof web3 !== "undefined") {
    // if(false){
    web3 = new Web3(web3.currentProvider);
    //   console.log('-------MetaMask Login-----------');
    //web3.personal.unlockAccount("web3.eth.coinbase"+web3.eth.coinbase);

    console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
  } else {
    console.log("No Web3 Detected... using HTTP Provider");
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  console.log("web3.version.api=" + web3.version.api);
  web3.eth.defaultAccount = web3.eth.accounts[0];
  console.log("Default Account is =" + web3.eth.defaultAccount + "\n");
  console.log(
    web3.eth.getBalance(
      web3.eth.defaultAccount,
      web3.eth.defaultBlock,
      function(error, result) {
        // Convert the balance to ethers
        var bal = web3.fromWei(result, "ether").toFixed(2);
        console.log("Balance is " + bal);
      }
    )
  );

  var abcContract = web3.eth.contract([]);
  console.log("abcContract=" + abcContract);
  var testerContract = web3.eth.contract([
    {
      constant: false,
      inputs: [{ name: "y", type: "uint256" }],
      name: "setX",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "l", type: "string" }],
      name: "setSoftwareLicense",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "getX",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "h", type: "string" }],
      name: "setHID",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getSoftwareHash",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getSoftwareLicense",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "s", type: "string" }],
      name: "setSoftwareHash",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getHID",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ]);
  var tester = testerContract.new(
    {
      from: web3.eth.accounts[0],
      data:
        "0x6060604052341561000f57600080fd5b60058054600160a060020a033316600160a060020a0319918216179091556006805490911673b4392fe899caf4439bd50b0539f148cfe129208d179055600a60005560408051908101604052601381527f414657322d414453342d554955312d554f4239000000000000000000000000006020820152600390805161009892916020019061009e565b50610139565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100df57805160ff191683800117855561010c565b8280016001018555821561010c579182015b8281111561010c5782518255916020019190600101906100f1565b5061011892915061011c565b5090565b61013691905b808211156101185760008155600101610122565b90565b6105fa806101486000396000f30060606040526004361061008d5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416634018d9aa8114610092578063496facb6146100aa5780635197c7aa146101725780636572b0a41461019757806375457690146101e85780637a9beffc146101fb578063ac37afa11461020e578063e5b845901461025f575b600080fd5b341561009d57600080fd5b6100a8600435610272565b005b34156100b557600080fd5b6100fb60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061027795505050505050565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561013757808201518382015260200161011f565b50505050905090810190601f1680156101645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561017d57600080fd5b6101856102b3565b60405190815260200160405180910390f35b34156101a257600080fd5b6100fb60046024813581810190830135806020601f820181900481020160405190810160405281815292919060208401838380828437509496506102d995505050505050565b34156101f357600080fd5b6100fb61030f565b341561020657600080fd5b6100fb6103d2565b341561021957600080fd5b6100fb60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061046095505050505050565b341561026a57600080fd5b6100fb610496565b600055565b61027f610524565b60055433600160a060020a0390811691161461029a57600080fd5b60038280516102ad929160200190610536565b50919050565b60055460009033600160a060020a039081169116146102d157600080fd5b506000545b90565b6102e1610524565b60055433600160a060020a039081169116146102fc57600080fd5b60018280516102ad929160200190610536565b610317610524565b60065433600160a060020a0390811691161461033257600080fd5b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c85780601f1061039d576101008083540402835291602001916103c8565b820191906000526020600020905b8154815290600101906020018083116103ab57829003601f168201915b5050505050905090565b6103da610524565b60065433600160a060020a039081169116146103f557600080fd5b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c85780601f1061039d576101008083540402835291602001916103c8565b610468610524565b60055433600160a060020a0390811691161461048357600080fd5b60028280516102ad929160200190610536565b61049e610524565b60065433600160a060020a039081169116146104b957600080fd5b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c85780601f1061039d576101008083540402835291602001916103c8565b60206040519081016040526000815290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061057757805160ff19168380011785556105a4565b828001600101855582156105a4579182015b828111156105a4578251825591602001919060010190610589565b506105b09291506105b4565b5090565b6102d691905b808211156105b057600081556001016105ba5600a165627a7a723058209cfd09d5508ddd2701dfeaa046b03abbc4d5e8981e6ba61587e8aa47d4960df10029",
      gas: "4700000"
    },
    function(e, contract) {
      console.log(e, contract);
      if (typeof contract.address !== "undefined") {
        console.log(
          "Contract mined! address: " +
            contract.address +
            " transactionHash: " +
            contract.transactionHash
        );
      }
    }
  );
}
function deployContract2() {
  var spcontract = web3.eth.contract([
    {
      constant: false,
      inputs: [
        {
          name: "y",
          type: "uint256"
        }
      ],
      name: "setX",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "l",
          type: "string"
        }
      ],
      name: "setSoftwareLicense",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "getX",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "h",
          type: "string"
        }
      ],
      name: "setHID",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getSoftwareHash",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getSoftwareLicense",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "s",
          type: "string"
        }
      ],
      name: "setSoftwareHash",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getHID",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ]);
  var add = "0x07d42dd5e3ac80b4b3f72caea1923f7962b5a33f";
  var spco = spcontract.at(add);
  var gas = 4000;
  var value = {
    from: web3.eth.defaultAccount,
    gas: gas
  };
  console.log(
    "software hash is setting=" +
      spco.setSoftwareHash("abcde", value, function(error, result) {
        if (!error) console.log("result of set method=" + result);
        else console.error("error=" + error);
      })
  );
  // var value1={

  // }
  console.log(
    "software hash is getting=" +
      spco.getSoftwareHash(value, function(error, result) {
        if (!error) console.log("result of get method=" + result);
        else console.error("error=" + error);
      })
  );
}
