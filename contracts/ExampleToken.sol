//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract ExampleToken is ERC20("Example Token", "ET"), Ownable {
    function mintFifty() public onlyOwner {
        _mint(msg.sender, 50 * 10 ** 18);
    }
}
