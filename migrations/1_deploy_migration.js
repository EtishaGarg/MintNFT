const mintContract = artifacts.require("MintContract");

module.exports = function (deployer) {
  deployer.deploy(mintContract);
};