// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tether is ERC20 {

    // Define the supply of the token: 1,000,000 
    uint256 constant initialSupply = 100000000 * (10**18);

    // Constructor will be called on contract creationasd
    constructor() ERC20("Tether", "USDT") {
        _mint(msg.sender, initialSupply);
    }
}