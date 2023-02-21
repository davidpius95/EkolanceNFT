// // SPDX-License-Identifier: MIT

/*
 * @author web3bridge.com
 * @notice Web3bridgeToken contract .
 * @title Web3bridgeNFT Collections of 1000 NFT
 */
pragma solidity 0.8.4;

import "./ERC721A/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./pricefeed.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BlossomingWeb3bridge is ERC721A, AccessControl, PriceConsumerV3 {
    // ERC20 token on Ethereum use for payment
    address public usdc;
    // map whitelist address to token claimed or not
    mapping(address => bool) public whitelistClaimed;
    // map whitelist address to amount minted
    mapping(address => uint40) public communityMintCount;
    // map investorAddress to amountMint
    mapping(address => uint256) public investorsMint;
    // map investorAddress to minted or not
    mapping(address => bool) public investorsWhitelistClaimed;

    mapping (address => bool) public whitelisted;
    // metadata prifix
    string public _baseTokenURI = "";
    // Metadata IPFS
    string public hiddenMetadataUri;
    // Whitelist cost for minting 1 NFT; in usdc
    uint128 public costWhitelist = 300000000;
    // publicSale cost for minting 1 NFT; in usdc
    uint128 public costPublicSale = 500000000;
    // max total supply of the collection
    uint256 public immutable TOTAL_COLLECTION_SUPPLY ;
    // keep track of supply
    uint256 public supply;
	  // max amount  whitelist user can mint
    uint256 public whitelistAmount = 3;
    // whitelist period
    bool public whitelistMintEnabled;
    // pause minting
    bool public pause;
    // turn on/of reveal image
    bool public revealed;

	  /**
     * The token does not exist.
     */
    error URIQueryForNonexistentToken();

    /**
     * @notice ADMIN_FUNCTION_ROLE bytes32 value to give an address admin role
     */
    bytes32 public constant MODERATOR_FUNCTION_ROLE =
        keccak256("MODERATOR_FUNCTION_ROLE");
    /**
     * @notice SUPER_ADMIN_ROLE bytes32 value to give Super Admin Role which can withdraw funds
     */
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @notice Initializes the contract with this parameter
     * @param _hiddenMetadataUri link to where metadata is store for cover image
     * @param baseTokenURI_ link to where metadata is store
     * @param _usdc this the token use for payment
     * @param _newAdmin this address of the new admin
     */

    constructor(
        address _usdc,
        address _newAdmin,
        string memory _hiddenMetadataUri,
        string memory baseTokenURI_,
		uint maxBatchSize_,
		uint collectionSize_
    ) ERC721A("BlossomingWeb3bridge", "Web3bridge",maxBatchSize_,collectionSize_) {

        usdc = _usdc;
        _baseTokenURI = baseTokenURI_;
        hiddenMetadataUri = _hiddenMetadataUri;
		TOTAL_COLLECTION_SUPPLY = collectionSize_;
        _grantRole(DEFAULT_ADMIN_ROLE, _newAdmin);
        _grantRole(MODERATOR_FUNCTION_ROLE, _newAdmin);
        _grantRole(ADMIN_ROLE, _newAdmin);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_grantRole(MODERATOR_FUNCTION_ROLE, msg.sender);
    }

    event whiteLisAddresstUser(bool);
    event whiteListUser(uint256, address);
    event investors(uint256, address);
    event pubMunt(uint256, address);

    /**
     * @notice Investors mint function, this allow investor to mint amount of token allocated to them
     * @return status value of true if all checks are true
     */
    function InvestorWhiteListMint() external returns (bool status) {
        require(!pause, "Is Pause");
        uint256 quantity = investorsMint[msg.sender];
        supply = totalSupply();
        require(quantity != 0, "Not investor");
        require(supply + quantity <= TOTAL_COLLECTION_SUPPLY, "max exceded");
        require(
            investorsWhitelistClaimed[msg.sender] == false,
            "minted already"
        );

        require(whitelistMintEnabled, "not Whitelist period");
        investorsWhitelistClaimed[msg.sender] = true;

        _safeMint(msg.sender, quantity);
        emit investors(quantity, msg.sender);
        return status;
    }

    /**
     * @notice Whitelist mint function, this allow whitelist user  to mint max of 3 token and pay $300 in usdc for each
     * @param quantity is the amount to mint
     * @param _status is the token to use for mint pass from the front end to select the type of token
     * @return status value of true if all checks are true
     */
    function WhitlistMint(uint40 quantity, bool _status)
        external
        payable
        returns (bool status)
    {
        require(!pause, "Is Pause");
        require(quantity > 0,"must not be zero");
        supply = totalSupply();
        require(supply + quantity <= TOTAL_COLLECTION_SUPPLY, "max exceded");
        require(quantity <= whitelistAmount, "exceed amount");
        require(whitelisted[msg.sender], "not whitelisted");
       // require(checkWhitelist(msg.sender, 1), "not whitelisted");
        require(whitelistMintEnabled, "not whitelist period");
        require(whitelistClaimed[msg.sender] == false, "minted already");
       
        require(
            communityMintCount[msg.sender] + quantity <= whitelistAmount,
            "Max mint limit"
        );
        if (_status) {
            require(
                IERC20(usdc).transferFrom(
                    msg.sender,
                    address(this),
                    costWhitelist * quantity
                ),
                "must pay cost"
            );
        } else {
            (bool sent, ) = payable(address(this)).call{
                value: calWhitelistPriceEth() * quantity
            }("");
            require(sent, "Failed to send Ether");
        }
         communityMintCount[msg.sender] += quantity;
       
       
        if (communityMintCount[msg.sender] == whitelistAmount) {
            whitelistClaimed[msg.sender] = true;
        }
         _safeMint(msg.sender, quantity);
        emit whiteListUser(quantity, msg.sender);

        return status;
    }

    /**
     * @notice public  mint function, this allow the public  to mint any amount  of token @ $500 each
     * @param quantity is the amount to mint
     * @param _status is the token to use for mint
     * @return status value of true if all checks are true
     */

    function publicMint(uint256 quantity, bool _status)
        external
        payable
        returns (bool status)
    {
        supply = totalSupply();
        require(quantity > 0, "mint 1");
        require(!pause, "Is Pause");
        require(whitelistMintEnabled == false , "not public period");
        require(supply + quantity <= TOTAL_COLLECTION_SUPPLY, "max exceded");
        if (_status) {
            require(
                IERC20(usdc).transferFrom(
                    msg.sender,
                    address(this),
                    costPublicSale * quantity
                ),
                "must pay cost"
            );
        } else {
            (bool sent, ) = payable(address(this)).call{
                value: calPublicPriceEth() * quantity
            }("");
            require(sent, "Failed to send Ether");
        }
        _safeMint(msg.sender, quantity);
        emit pubMunt(quantity, msg.sender);
        return status;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

     /**
     * @notice calculate price of eth in usd the reveal state
     * 
     */
    function calWhitelistPriceEth() public view returns(uint){
       return costWhitelist*1e20/uint(getLatestPrice());
    }
	
    /**
     * @notice calculate price of eth in usd the reveal state
     * 
     */
    function calPublicPriceEth() public view returns(uint){
         
       return costPublicSale*1e20/uint(getLatestPrice());
    }
    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(_tokenId)) revert URIQueryForNonexistentToken();

        if (revealed == false) {
            return hiddenMetadataUri;
        }

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length != 0
                ? string(
                    abi.encodePacked(baseURI)
                )
                : "";
    }

    /**
     * @notice Sets the reveal state
     * @param _state the reveal state on/off
     */
    function setRevealed(bool _state)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        revealed = _state;
    }

    /**
     * @notice Sets the _cost for whitelist users
     * @param _cost the new cost for whitelist
     */
    function setCostWhitelist(uint128 _cost)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        costWhitelist = _cost;
    }

   

    /**
     * @notice Sets the _cost for the public
     * @param _cost the new cost for public
     */
    function setcostPublicSale(uint128 _cost)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        costPublicSale = _cost;
    }

    /**
     * @notice Sets the hidden MetadataUri
     * @param _hiddenMetadataUri The base extension
     */
    function setHiddenMetadataUri(string memory _hiddenMetadataUri)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        hiddenMetadataUri = _hiddenMetadataUri;
    }

    /**
     * @notice Sets the base extension
     * @param __baseTokenURI The base extension
     */
    function set_baseTokenURI(string memory __baseTokenURI)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        _baseTokenURI = __baseTokenURI;
    }



    /**
     * @notice Toggles the paused state flag to false or true
     * @param _state the state
     */
    function setPaused(bool _state) external onlyRole(MODERATOR_FUNCTION_ROLE) {
        pause = _state;
    }

    /**
     * @notice set the token use for payment
     * @param _usdc this the usdc contract address deploy on Ethereum mainnet
     */
    function setToken(address _usdc)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        usdc = _usdc;
    }

	function setWhitelistAmount(uint _whitelistAmount)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        whitelistAmount = _whitelistAmount;
    }
	
    /*
     * @notice Toggles the paused state flag to false or true
     * @param _state the new input
     */
    function setWhitelistMintEnabled(bool _state)
        external
        onlyRole(MODERATOR_FUNCTION_ROLE)
    {
        whitelistMintEnabled = _state;
    }

     function setWhitelistTrue(address[] memory  _user)
        public
         onlyRole(MODERATOR_FUNCTION_ROLE)
    {
         for (uint256 i = 0; i < _user.length; i++) {
        whitelisted[_user[i]] = true;
         }
          emit whiteLisAddresstUser(true);
    
    }
     function setWhitelistFalse(address[] memory  _user)
        public
         onlyRole(MODERATOR_FUNCTION_ROLE)
    {
         for (uint256 i = 0; i < _user.length; i++) {
        whitelisted[_user[i]] = false;
         }
          emit whiteLisAddresstUser(true);
    
    }

    

    /**
     * @notice Adds the given user address  and amount to the list of whitelisted users and amount for the investors
     * @param _investors The investors address
     * @param _amount The amount allocated to the investors address respectively
     */
    function investorsWhitelistUsers(
        address[] calldata _investors,
        uint256[] calldata _amount
    ) external onlyRole(MODERATOR_FUNCTION_ROLE) {
        require(
            _investors.length == _amount.length,
            "incorrect length matching"
        );
        for (uint256 i; i < _investors.length; i++) {
            require(_investors[i] != address(0), "must not be address Zero");
            investorsMint[_investors[i]] = _amount[i];
        }
    }

    // ETH balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //  /**
    //    * @notice Withdraws ERC20 to the given account
    //    * @param account The address of the recipient account
    //    * @return success value of true if successful
    //    */
    function withdraw(address payable account)
        external
        payable
        onlyRole(ADMIN_ROLE)
        returns (bool)
    {
        require(account != address(0), "not zero address");
        return
            IERC20(usdc).transfer(
                account,
                IERC20(usdc).balanceOf(address(this))
            );
    }

    function withdrawETH(address payable account)
        external
        payable
        onlyRole(ADMIN_ROLE)
        returns (bool success)
    {
        require(account != address(0), "not zero address");
        (bool sent, ) = account.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        return success;
    }

	function setOwnersExplicit(uint256 quantity) external onlyRole(MODERATOR_FUNCTION_ROLE) {
    _setOwnersExplicit(quantity);
  }


  function getOwnershipURI(uint256 tokenId)
    external
    view
    returns (TokenOwnership memory)
  {
    return ownershipOf(tokenId);
  }


function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  

    /**
     * Override for ERC721 & ERC721Enumerable
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
	


    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
}
