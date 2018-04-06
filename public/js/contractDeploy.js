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
  console.log(JSON.stringify("updateContractList++++++++++++" + contractsData));
  for (let i in contractsData) {
    console.log("contracts data-----" + JSON.stringify(contractsData[i]));
    str +=
      "<li>" +
      contractsData[i].email +
      contractsData[i].abi.constant +
      `<button id='${
        contractsData[i].email
      }' onClick="deployContract('${i}')">Deploy</button></li>`;
  }
  str += "</ul>";

  $("#list").append(str);

  var str1 = "<ul>";
  for (i in deployedContractsData) {
    str1 +=
      "<li>" +
      deployedContractsData[i].email +
      `<button onClick=setContractValue('${i}')>SET DATA</button></li>`;
  }
  str1 += "</ul>";
  $("#setValues").append(str1);
}

function deployContract(index) {
  data = contractsData[index];
  console.log("Data = > ", data);
  var testerContract = web3.eth.contract(data.abi);
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

function setContractValue(index) {
  data = deployedContractsData[index];
  console.log("in set value method..." + JSON.stringify(data));
  var contract = web3.eth.contract(data.abi);
  var add = data.contractAddress;
  var contractAtAddress = contract.at(add);
  var gas = 4000000;
  var value = {
    from: web3.eth.accounts[0],
    gas: gas
  };

  let count = 0;
  contractAtAddress.getSoftwareHash(value, function(error, result) {
    if (!error) {
      console.log("result of setsoftwarehash method=" + result);
      count++;
      if (count == 5) {
        sendContractValueSetStatus(data.email);
      }
    } else console.log("error=" + error);
  });

  contractAtAddress.getHID(value, function(error, result) {
    if (!error) {
      console.log("result of sethid method=" + result);
      count++;

      if (count == 5) {
        sendContractValueSetStatus(data.email);
      }
    } else console.log(" error=" + error);
  });
}

function sendContractValueSetStatus(emailId) {
  var sendData = {
    email: emailId
  };
  console.log(sendData.email);
  $.ajax({
    type: "POST",
    url: "http://localhost:1234/contractValuesSet",
    timeout: 20000,
    data: sendData,
    statusCode: {
      200: function(data) {
        console.log(data);
        alert(data);
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
