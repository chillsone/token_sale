pragma solidity ^0.5.0;

import "./PlutarhToken.sol";

contract PlutarhTokenSale {
  address payable admin;
  PlutarhToken public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  constructor(PlutarhToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }	
  event Sell(address _buyer, uint256 _amount);
  //buy tokens
  function  multyple(uint x, uint y) internal pure returns(uint z) {
  	require(y==0 || (z = x*y) / y == x);
  }
  


  function buyTokens(uint256 _numberOfTokens) public payable{
  	require(msg.value == multyple(_numberOfTokens,tokenPrice));

  	require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
  	

  	require (tokenContract.transfer(msg.sender, _numberOfTokens));
  	


  	tokensSold += _numberOfTokens;
  	emit Sell(msg.sender, _numberOfTokens);
  }

  function endSale() public{
  	//destroy contract

  	require (msg.sender == admin);
  	
  	require (tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
   	
  }
  
}

