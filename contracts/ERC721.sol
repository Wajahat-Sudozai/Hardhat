// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721Custom is ERC721, AccessControl {
    using Counters for Counters.Counter;
    mapping(uint256=>string)private _uris;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("WAJAHAT", "WAJ") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, string memory tokenuri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        updateUri(tokenId, tokenuri);
    }

    function updateUri(uint256 tokenId,string memory URI) internal {
        require(bytes(_uris[tokenId]).length==0,"Metadata: cannot set uri twice");
        _uris[tokenId]=URI;
    }

    function tokenURI(uint256 tokenIds) public view override returns (string memory)
    {
       return (_uris[tokenIds]);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
