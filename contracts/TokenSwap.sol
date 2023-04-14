// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract TokenSwap {
    address public token1;
    address public token2;
    address public owner;
    uint256 public rate1;
    uint256 public rate2;

    event Swapped(address indexed sender, uint256 amount1, uint256 amount2);

    constructor(address _token1, address _token2, uint256 _rate1, uint256 _rate2) {
        token1 = _token1;
        token2 = _token2;
        rate1 = _rate1;
        rate2 = _rate2;
        owner = msg.sender;
    }

    function swap(uint256 _amount1) external {
        uint256 amount2 = _amount1 * rate1 / rate2;

        require(IERC20(token1).balanceOf(msg.sender) >= _amount1, "Insufficient balance");
        require(IERC20(token2).balanceOf(address(this)) >= amount2, "Insufficient liquidity");

        IERC20(token1).transferFrom(msg.sender, address(this), _amount1);
        IERC20(token2).transfer(msg.sender, amount2);

        emit Swapped(msg.sender, _amount1, amount2);
    }

    function setRates(uint256 _rate1, uint256 _rate2) external {
        require(msg.sender == owner, "Only owner can set rates");
        rate1 = _rate1;
        rate2 = _rate2;
    }

    function withdraw(address _token, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        IERC20(_token).transfer(msg.sender, _amount);
    }
}