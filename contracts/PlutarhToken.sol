pragma solidity ^0.5.0;


/**
 * The PlutarhToken contract 
 */
 contract PlutarhToken {
   //constructor
   //set number of total tokens
   //read the total number of tokens
   uint256 public totalSupply;
   //name
   string public name = "PlutarhToken";
   string public symbol = "PTA";
   string public standard ="PTA Beta v1.0.0";

   event Transfer(
   		address indexed _from,
   		address indexed _to,
   		uint256 _value
   	);
   //symbol
   //transfer event
   event Approval(
   		address indexed _owner,
   		address indexed _spender,
   		uint256 _value
   	);

   mapping(address => uint256) public balanceOf;
   //allowance
   mapping(address => mapping(address => uint256)) public allowance;

   constructor(uint256 _initialSupply) public {
   	balanceOf[msg.sender] = _initialSupply;
   	totalSupply = _initialSupply;
   	//allocate the initial supply


   }
   //transfer Exception if account doesen't have enought balance , return a boolean , transfer event ,public
   function transfer(address _to , uint256 _value) public returns (bool success){
   		require(balanceOf[msg.sender] >= _value);
   		//transfer the balance
   		balanceOf[msg.sender] -= _value;
   		balanceOf[_to] += _value;
   		emit Transfer(msg.sender, _to, _value);

   		return true;
   }   
   //delegated transgers 

   //approve event
  
    function approve(address _spender , uint256 _value) public returns (bool success){
    	allowance[msg.sender][_spender] = _value;

  		emit Approval(msg.sender, _spender, _value);
   		return true;
   } 
   //transfer 
   function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
   		
   		require (_value <= balanceOf[_from]);
   		require (_value <= allowance[_from][msg.sender]);
   		
   		//require _from has no tokens
   		//require allowace is big enough to send
   		emit Transfer(_from, _to, _value);
   		//change the balanace
   		balanceOf[_from] -= _value;
   		balanceOf[_to] += _value;
   		allowance[_from][msg.sender] -= _value;
   		
   		//Update the allowance
   		//transfer event
   		//return a boolean
   		return true;
   }
   
   
 }



