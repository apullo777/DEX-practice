// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract DEX {
    address public token;
    uint256 public price;
    
    constructor(address _token) {
        token = _token;
        price = 1 ether; // 1 ether = 1 token
    }
    
    function buy() public payable {
        require(msg.value >= price, "Not enough Ether provided");
        uint256 amount = msg.value / price;
        IERC20(token).transfer(msg.sender, amount);
    }
    
    function sell(uint256 amount) public {
        require(IERC20(token).allowance(msg.sender, address(this)) >= amount, "Not enough allowance");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount * price);
    }
}