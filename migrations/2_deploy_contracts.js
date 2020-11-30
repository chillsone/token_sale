var PlutarhToken = artifacts.require("./PlutarhToken.sol");

module.exports = function (deployer) {
  deployer.deploy(PlutarhToken);
};
