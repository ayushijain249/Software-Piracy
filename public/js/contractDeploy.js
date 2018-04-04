window.addEventListener("load", fetchUndeployedContracts);
var contractsData = [];
var deployedContractsData = [];

function init() {
  // document.getElementById("retry").hidden = true;
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    console.log("Seems to be working");
    // setWeb3Version();
    //doGetAccounts();
  } else {
    console.log("Injected web3 Not Found!!!");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    // window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:1234'));

    // var provider = document.getElementById('provider_url').value;
    // window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }
}

function fetchUndeployedContracts() {
  init();
  $.ajax({
    type: "POST",
    url: "http://localhost:1234/unDeployedContracts",
    timeout: 20000,
    statusCode: {
      200: function(data) {
        console.log("------undeployedContracts" + JSON.stringify(data));
        contractsData = data;
        fetchDeployedContracts();
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
    },
    error: function(data) {}
  });
}

function fetchDeployedContracts() {
  $.ajax({
    type: "POST",
    url: "http://localhost:1234/withoutvalueContracts",
    timeout: 20000,
    statusCode: {
      200: function(data) {
        console.log("------deployedContracts" + JSON.stringify(data));
        deployedContractsData = data;
        updateContractList();
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
    },
    error: function(data) {}
  });
}

function updateContractList() {
  var str = "<ul>";
  for (i in contractsData) {
    str +=
      "<li>" +
      contractsData[i].email +
      "<button id='contractsData[i].email' onClick=deployContract(contractsData[i])>Deploy</button></li>";
  }
  str += "</ul>";

  $("#list").append(str);

  var str1 = "<ul>";
  for (i in deployedContractsData) {
    str1 +=
      "<li>" +
      deployedContractsData[i].email +
      "<button onClick=setContractValue(deployedContractsData[i])>SET DATA</button></li>";
  }
  str1 += "</ul>";
  $("#setValues").append(str1);
}

function deployContract(data) {
  console.log("in deploy contract method");

  var testerContract = web3.eth.contract(JSON.parse(data.abi));
  console.log(testerContract);
  var byteCode = "0x" + data.byteCode;
  var tester = testerContract.new(
    {
      from: web3.eth.accounts[0],
      data: byteCode,
      gas: "3500000"
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

function setContractValue(data) {
  console.log("in set value method..." + JSON.stringify(data));

  var contract = web3.eth.contract([
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
      constant: true,
      inputs: [],
      name: "getX",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "gety",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ]);

  /*var byteCode = "0x" + data.byteCode;
  var tester = contract.new(
    {
      from: web3.eth.accounts[0],
      data:
        "0x6060604052341561000f57600080fd5b61010c8061001e6000396000f3006060604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634018d9aa1460585780635197c7aa146078578063807b4c3314609e575b600080fd5b3415606257600080fd5b6076600480803590602001909190505060c4565b005b3415608257600080fd5b608860ce565b6040518082815260200191505060405180910390f35b341560a857600080fd5b60ae60d7565b6040518082815260200191505060405180910390f35b8060008190555050565b60008054905090565b600080549050905600a165627a7a723058205391644a0754700c2764e58f906555ac82b280526691965f0ea0742ccb48cb6d0029",
      gas: "3500000"
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
*/
  var add = data.contractAddress;
  var contractAtAddress = contract.at(
    "0xb6b365d1c58a9535913d7eebbe198ac4475a3af7"
  );
  var gas = 4000000;
  var value = {
    from: web3.eth.accounts[0],
    gas: gas
  };
  /* contractAtAddress.setSoftwareHash(data.fid, value, function(error, result) {
    if (!error) console.log("result of setsoftwarehash method=" + result);
    else console.log("error=" + error);
  });

  contractAtAddress.setHID(data.hid, value, function(error, result) {
    if (!error) console.log("result of sethid method=" + result);
    else console.log(" error=" + error);
  });
*/
  console.log(
    "getting value--->" +
      contractAtAddress.getX(value, function(error, result) {
        if (!error) console.log("result of gethid method=" + result);
        else console.log("error=" + error);
      })
  );
}

function get() {}
