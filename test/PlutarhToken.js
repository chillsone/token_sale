var PlutarhToken = artifacts.require("./PlutarhToken.sol");

contract('PlutarhToken', function(accounts){
	var tokenInstance;
	it('initializes the contract with the correct values', function(){
		return PlutarhToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'PlutarhToken', 'has correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'PTA', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'PTA Beta v1.0.0', 'standard is correct')
		});
	})

	it('it allocates iniitial supply upon deployment', function(){
		return PlutarhToken.deployed().then(function(i){
			tokenInstance = i;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 100000, 'sets the total supply to 100,000');
		    return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 100000, 'it allocates the initial supply to admin account.');
		});
	});
	it('transfers token ownership', function(){
		return PlutarhToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.transfer.call(accounts[1], 99999999999);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 2500, {from: accounts[0] });
		}).then(function(success) {
    		assert.equal(success, true, 'it returns true');
			return tokenInstance.transfer(accounts[1], 2500, {from: accounts[0] });	
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'error message must contain revert');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event'); 
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from ');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
			assert.equal(receipt.logs[0].args._value, 2500, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 2500, 'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0])
		}).then(function(balance){
			assert.equal(balance.toNumber(), 97500, 'deducts the amount from the sending account');
		});
	});

})