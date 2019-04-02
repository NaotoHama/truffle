const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract = artifacts.require("BusinessContract");
const BusinessContract2 = artifacts.require("BusinessContract2");
const BusinessInterface = artifacts.require("BusinessInterface");

contract('ProxyContract', function(accounts) {
  it("test delegatecall BusinessContract", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface.at(proxy_contract.address)

    //await proxy_contract.delegateCallBusiness("setCount(uint256)", arg);
    await proxy_contract.setCount(11);

    //let count_proxy_contract = await proxy_contract.delegateCallBusiness.call("getCount()", []);
    let count_proxy_contract = await proxy_contract.getCount();
    assert.equal(count_proxy_contract, 11, "ProxyContractのデータエラー")

    // ビジネスコントラクトに影響なし
    let count_business_contract = await business_contract.getCount();
    assert.equal(count_business_contract, 2, "BusinessContractのデータエラー")
    
  });

  it("test delegatecall BusinessContract2", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract2.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface.at(proxy_contract.address)

    //await proxy_contract.delegateCallBusiness("setPoint(uint256,uint256)", [0,100]);
    await proxy_contract.setPoint(0,100);

    //let count_proxy_contract = await proxy_contract.delegateCallBusiness.call("getPoint(uint256)", [0]);
    let count_proxy_contract = await proxy_contract.getPoint(0);
    assert.equal(count_proxy_contract, 100, "ProxyContractのデータエラー")

    // ビジネスコントラクトに影響なし
    let count_business_contract = await business_contract.getPoint(0);
    assert.equal(count_business_contract, 12345, "BusinessContract2のデータエラー")

  });

  it("test delegatecall BusinessContract2", async function() {
    var proxy_contract = await ProxyContract.deployed();
    var business_contract = await BusinessContract2.deployed();
    await proxy_contract.setBusinessContract(business_contract.address);
    proxy_contract = await BusinessInterface.at(proxy_contract.address)

    //await proxy_contract.delegateCallBusiness("addVariable(uint256,string)", [100, "message"]);
    await proxy_contract.addVariable(100,"this is correct message.");

    //let count_proxy_contract = await proxy_contract.delegateCallBusiness.call("getVariable(uint256)", [0]);
    let data_proxy_contract = await proxy_contract.getVariable(0);
    console.log(data_proxy_contract)
    assert.equal(data_proxy_contract['0'],100, "ProxyContractのデータエラー")
    assert.equal(data_proxy_contract['1'],"this is correct message.", "ProxyContractのデータエラー")

    // ビジネスコントラクトに影響なし
    let data_business_contract = await business_contract.getVariable(0);
    console.log(data_business_contract)
    assert.equal(data_business_contract['0'],1, "BusinessContractのデータエラー")
    assert.equal(data_business_contract['1'],"message", "BusinessContractのデータエラー")

  });

});
