pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FakeTeamToken is ERC721 {

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(uint tokenId) public {
        _mint(msg.sender, tokenId);
    }

    function mintTo(uint tokenId, address _to) public {
        _mint(_to, tokenId);
    }

}
