const ProxyContract = artifacts.require("ProxyContract");
const BusinessContract = artifacts.require("BusinessContract");
const BusinessContract2 = artifacts.require("BusinessContract2");
//const BusinessInterface = artifacts.require("BusinessInterface");

module.exports = function(deployer) {
  deployer.deploy(ProxyContract);
  deployer.deploy(BusinessContract);
  deployer.deploy(BusinessContract2);
};
