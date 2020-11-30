var PlutarhToken = artifacts.require("./PlutarhToken.sol");

contract('PlutarhToken', function(accounts){
	it('sets the total supply upon deployment', function(){
		return PlutarhToken.deployed().then(function(i){
			tokenInstance = i;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 100000, 'sets the total supply to 100,000');
		});
	});
})