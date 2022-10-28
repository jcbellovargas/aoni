// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestContract {
   IERC20 private token;

  constructor(address _tokenAddress) {
    token = IERC20(_tokenAddress);
  }

  mapping (address => uint256) userBalances;

  function deposit(uint256 amount) external {
    require(token.balanceOf(msg.sender) >= amount, "Your token balance must be greater than your deposit amount");
    userBalances[msg.sender] += amount;
    token.transferFrom(msg.sender, address(this), amount);
  }

  function getUserBalance(address _address) public view returns(uint256) {
    return userBalances[_address];
  }

  function withdraw(uint amount) external {
    require(userBalances[msg.sender] >= amount, "Your contract user balance must be higher than your withdraw amount");
    userBalances[msg.sender] -= amount;
    token.transfer(msg.sender, amount);
  }

}