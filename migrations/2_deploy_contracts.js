var PlutarhToken = artifacts.require("./PlutarhToken.sol");
var PlutarhTokenSale = artifacts.require("./PlutarhTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(PlutarhToken, 100000).then(function(){
  	var tokenPrice = 100000000000;
  	return deployer.deploy(PlutarhTokenSale, PlutarhToken.address, tokenPrice);
  });
  
};

