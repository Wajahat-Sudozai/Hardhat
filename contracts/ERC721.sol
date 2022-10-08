// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721Test is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256=>string)private _uris;

    constructor() ERC721("GameItem", "WM")  {
    }

    // function awardItem(address player) public returns (uint256) {
    function mintNFT(address player, string memory tokenuri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        // _setTokenURI(newItemId, tokenURI);
        updateUri(newItemId, tokenuri);
        return newItemId;
    }

     function updateUri(uint256 tokenid,string memory URI) internal {
        require(bytes(_uris[tokenid]).length==0,"Metadata: cannot set uri twice");
        _uris[tokenid]=URI;
    }

    function tokenURI(uint256 tokenIds) public view override returns (string memory)
    {
       return (_uris[tokenIds]);
    }
}