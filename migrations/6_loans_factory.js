const AssetsExchange = artifacts.require("./SimpleAssetsExchange.sol");
const PriceProvider = artifacts.require("./SimplePriceProvider.sol");
const Pool = artifacts.require("./Pool.sol");
const SmartLoansFactory = artifacts.require("./SmartLoansFactory.sol");

module.exports = function(deployer) {
  var factory;
  deployer.deploy(SmartLoansFactory, Pool.address, PriceProvider.address, AssetsExchange.address)
    .then(function(instance) {
      factory = instance;
      console.log("Smart Loan factory deployed: " + factory.address);
      return Pool.deployed();
    }).then(function(pool) {
     console.log("Setting borrowers registry on: " + pool.address);
     return pool.setBorrowersRegistry(factory.address, {gas:300000});
  })

};
