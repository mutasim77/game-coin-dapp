// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCoin is ERC20, Ownable {
    uint256 public sellRate; // The current sell rate: 1 GC = sellRate ETH
    uint256 public buyRate; // The current buy rate: 1 GC = buyRate ETH

    /*
     * Constructor: Initializes the contract with the ERC20 token name, symbol, and sets
     * the initial owner. Also sets default sellRate and buyRate.
     */
    constructor(address owner) payable ERC20("GameCoin", "GC") Ownable(owner) {
        sellRate = 1e18;
        buyRate = 1e18;
    }

    /* 1)
     * Public payable function buy(uint256 gcAmount) which is called when buying N game
     * coins (GC) for M ETH within the current sellRate. gcAmount must match to rated
     * amount of ETH in the transaction and be checked by the function.
     */
    function buy(uint256 gcAmount) external payable {
        uint256 ethAmount = gcAmount * sellRate;
        require(msg.value == ethAmount, "Incorrect ETH amount");
        _mint(msg.sender, gcAmount);
    }

    /* 2)
     * Public function sell(uint256 gcAmount) which is called when selling N game coins (GC)
     * for M ETH within the current buyRate.
     */
    function sell(uint256 gcAmount) external {
        require(balanceOf(msg.sender) >= gcAmount, "Insufficient balance");
        uint256 ethAmount = gcAmount * buyRate;
        _burn(msg.sender, gcAmount);
        payable(msg.sender).transfer(ethAmount);
    }

    /* 3)
     * Public function send(address to, uint256 gcAmount) which is called when transferring
     * N game coins (GC) from balance to the given address.
     */
    function send(address to, uint256 gcAmount) external {
        require(balanceOf(msg.sender) >= gcAmount, "Insufficient balance");
        _transfer(msg.sender, to, gcAmount);
    }

    /* 4)
     * Public function sendToOwner(uint256 amount) which is called when there is a need to
     * send N game coins (GC) to the Smart Contract owner and this function can be called
     * only by the owner.
     */
    function sendToOwner(uint256 gcAmount) external onlyOwner {
        _transfer(msg.sender, owner(), gcAmount);
    }

    /* 5)
     * Public function setRates(uint256 sellRate, uint256 buyRate) which is called when there
     * is a need to change the rate of the game coins (GC) and this function can be called
     * only by the owner. sellRate is given by a wei and defines the cost of 1 game coin (GC)
     * for selling in ETH and buyRate is given by a wei and defines the cost of 1 game coin
     * (GC) for buying in ETH.
     *
     * NOTE: In Ethereum, 1 Ether is equal to 10^18 wei.
     */
    function setRates(uint256 _sellRate, uint256 _buyRate) external onlyOwner {
        sellRate = _sellRate;
        buyRate = _buyRate;
    }
}
