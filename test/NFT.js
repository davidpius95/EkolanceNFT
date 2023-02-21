const { messagePrefix } = require("@ethersproject/hash");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const erc20 = require("../artifacts/contracts/mock/USDC.sol/USDT.json");
const priceABI = require("../artifacts/contracts/pricefeed.sol/PriceConsumerV3.json");



describe("deploy", async function() {
  let NFT;
  let owner;
  let owner2;
  let deployer;
  let WNFT;
  let BWNFT;
  let token;
  let Admin;
  let signer;
	//let USDTtoken;
  before("deploy contract", async () => {
	
	const accountToInpersonate2 = "0xa205fD7344656c72FDC645b72fAF5a3DE0B3E825";   
	const USDTtoken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";              
	await hre.network.provider.request({
		method: "hardhat_impersonateAccount",
		params: [accountToInpersonate2],
	  });
	const baseuri = "https://gateway.pinata.cloud/ipfs/QmSQnZ3kN9sgcYMf3Y7Mgtqpf29ikhsKHCDzdqqzLhzd99";
	//const impersonatedSigner = await ethers.getImpersonatedSigner("0x1234567890123456789012345678901234567890");

	 signer = await ethers.getSigner(accountToInpersonate2);
	[deployer,Admin, owner1, owner2] = await ethers.getSigners();


	 token = await new ethers.Contract(
		USDTtoken,
		erc20.abi,
		signer
	  );
	  console.log("check",await token.name());
	  console.log("check2",await token.balanceOf(accountToInpersonate2));
	  console.log("check3",await token.balanceOf(signer.address));
	  console.log("check4",await token.balanceOf(Admin.address));


	  const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth")
	 // const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
	  /**
     * Network: Goerli
     * Aggregator: ETH/USD
     * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
     * Address Network- Ethereum Mainnet:0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
     */
	
	  const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
	  const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
	  const priceFeed = new ethers.Contract(addr, priceABI.abi, Admin)
	  console.log(priceFeed);
	  priceFeed.getLatestPrice()
		  .then((roundData) => {
			  // Do something with roundData
			  console.log("Latest Round",roundData.answer );
			  const hextoDecimal = hex => parseInt(hex,16);
			  console.log("Latest Round Data",hextoDecimal(roundData.answer._hex) );
		  })


	
	// Token = await hre.ethers.getContractFactory("USDC");
	//  token = await Token.deploy();
	// await token.deployed();
	// console.log("token deployed to:", token.address);
  
	const BNFT = await hre.ethers.getContractFactory("BlossomingWeb3bridge");
	BWNFT = await BNFT.deploy(token.address,Admin.address,"https://gateway.pinata.cloud/ipfs/QmSQnZ3kN9sgcYMf3Y7Mgtqpf29ikhsKHCDzdqqzLhzd99","https://gateway.pinata.cloud/ipfs/QmSQnZ3kN9sgcYMf3Y7Mgtqpf29ikhsKHCDzdqqzLhzd99");
	await BWNFT.deployed();
	
	console.log("BWNFT deployed to:", BWNFT.address);
  });
 describe("test view functions",function(){
	it("token name", async function() {
		expect(await BWNFT.name()).to.equal("BlossomingWeb3bridge");
	  });
	    it("token symbol", async function() {
    expect(await BWNFT.symbol()).to.equal("Web3bridge");
  });
  it("token totalsupply", async function() {
    expect(await BWNFT.totalSupply()).to.equal(0);
  });

  
 })
describe("test mint functions",function(){
	it(" public mint in USDT", async function() {
		let value = ethers.utils.parseEther("2000").toString();
		await token.connect(signer).approve(BWNFT.address,value);
		await BWNFT.connect(signer).publicMint(2,true);
		expect(await BWNFT.balanceOf(signer.address)).to.equal(2);
		expect(await BWNFT.ownerOf(1)).to.equal(signer.address);
	  });
	  it(" public mint in Ether", async function() {
		let val = await BWNFT.calPublicPriceEth();
		const tx = await BWNFT.connect(Admin).publicMint(1,false,{value:val});
		await tx.wait()
		expect(await BWNFT.balanceOf(Admin.address)).to.equal(1);
		expect(await BWNFT.ownerOf(2)).to.equal(Admin.address);
	  });

	  it(" investors mint ", async function() {
		await BWNFT.connect(Admin).setWhitelistMintEnabled(true);
		await BWNFT.connect(Admin).investorsWhitelistUsers([owner1.address],[3]);
		await BWNFT.connect(owner1).InvestorWhiteListMint();
		expect(await BWNFT.balanceOf(owner1.address)).to.equal(3);
		expect(await BWNFT.ownerOf(3)).to.equal(owner1.address);
	  });

	  it(" whitelistMint in USDT ", async function() {
		await BWNFT.connect(Admin).whiteListUsers([owner1.address,owner2.address,signer.address],[1]);
		await BWNFT.connect(Admin).setWhitelistMintEnabled(true);
		let value = ethers.utils.parseEther("200000000").toString();
		await token.connect(signer).approve(BWNFT.address,value);
		await BWNFT.connect(signer).WhitlistMint(2,true);
		expect(await BWNFT.balanceOf(signer.address)).to.equal(4);
		expect(await BWNFT.ownerOf(1)).to.equal(signer.address);
	  });
	  it(" whitelistMint in ETHER ", async function() {
		await BWNFT.connect(Admin).whiteListUsers([owner1.address,owner2.address,signer.address],[1]);
		await BWNFT.connect(Admin).setWhitelistMintEnabled(true);
		let val = await BWNFT.calWhitelistPriceEth();
		const tx = await BWNFT.connect(owner1).WhitlistMint(1,false,{value:val});
		 await tx.wait()
		 expect(await BWNFT.balanceOf(owner1.address)).to.equal(4);
		expect(await BWNFT.ownerOf(8)).to.equal(owner1.address);
	  }); 
 })
 describe("test mint functions with revert",function(){
	it(" public mint in USDT to revert if is not whitelist period", async function() {
		await BWNFT.connect(Admin).setWhitelistMintEnabled(false);
		let value = ethers.utils.parseEther("2000").toString();
		await token.connect(signer).approve(BWNFT.address,value);
		const tx = await BWNFT.connect(signer).publicMint(2,true);
		expect(await BWNFT.balanceOf(signer.address)).to.equal(6);
		expect(tx).to.be.revertedWith("not public period");
	  });
	  it(" public mint in Ether should revert ", async function() {
		// let value = ethers.utils.parseEther("200000000").toString();
		let val = await BWNFT.calWhitelistPriceEth();
		const tx = await BWNFT.connect(Admin).publicMint(1,false);
		expect(await BWNFT.balanceOf(signer.address)).to.equal(2);
		expect(tx).to.be.revertedWith();
		//expect(await BWNFT.ownerOf(1)).to.equal(signer.address);
	  });

	  it(" investors mint ", async function() {
		//await BWNFT.whiteListUsers([owner1.address],[1]);
		await BWNFT.connect(Admin).setWhitelistMintEnabled(true);
		await BWNFT.connect(Admin).investorsWhitelistUsers([owner1.address],[3]);
		await BWNFT.connect(owner1).InvestorWhiteListMint();
		expect(await BWNFT.ownerOf(3)).to.equal(owner1.address);
	  });

	  it(" whitelistMint in USDT ", async function() {
		await BWNFT.connect(Admin).whiteListUsers([owner1.address,owner2.address,signer.address],[1]);
		await BWNFT.connect(Admin).setWhitelistMintEnabled(true);
		let value = ethers.utils.parseEther("200000000").toString();
		await token.connect(signer).approve(BWNFT.address,value);
		await BWNFT.connect(signer).WhitlistMint(2,true);
		
		expect(await BWNFT.ownerOf(1)).to.be.revertedWith('OwnerQueryForNonexistentToken()');
	  });
	  it(" whitelistMint in ETHER ", async function() {
		await BWNFT.connect(Admin).whiteListUsers([owner1.address,owner2.address,signer.address],[1]);
		await BWNFT.connect(Admin).setWhitelistMintEnabled(true);
		let amount = ethers.utils.parseEther('0.17', 'ether')
		const tx = await BWNFT.connect(owner1).WhitlistMint(1,false,{value:amount});
		// await tx.wait()
		expect(await BWNFT.ownerOf(8)).to.equal(owner1.address);
	  }); 
	
 })

});
