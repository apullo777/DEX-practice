// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract DEX {
    address public token;
    uint256 public price;
    uint256 public tradingFee;

    constructor(address _token, uint256 _tradingFee) {
        token = _token;
        price = 1 ether; // 1 ether = 1 token
        tradingFee = _tradingFee; // Trading fee as a percentage (e.g. 500 = 5%)
    }

    function buy() public payable {
        require(msg.value >= price, "Not enough Ether provided");
        uint256 amount = msg.value / price;
        ERC20(token).transfer(msg.sender, amount);
        uint256 fee = (amount * tradingFee) / 10000; // Calculate trading fee
        ERC20(token).transfer(owner(), fee); // Transfer fee to owner of the contract
    }

    function sell(uint256 amount) public {
        require(ERC20(token).allowance(msg.sender, address(this)) >= amount, "Not enough allowance");
        ERC20(token).transferFrom(msg.sender, address(this), amount);
        uint256 fee = (amount * tradingFee) / 10000; // Calculate trading fee
        ERC20(token).transfer(owner(), fee); // Transfer fee to owner of the contract
        payable(msg.sender).transfer((amount - fee) * price); // Transfer remaining tokens to the seller
    }
}
