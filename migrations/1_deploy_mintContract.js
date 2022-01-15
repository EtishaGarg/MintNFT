const mintContract = artifacts.require("mintContract");

module.exports = function (deployer) {
  deployer.deploy(mintContract);
};