const { ethers } = require("hardhat");
const hre = require("hardhat")
const erc20 = require("../artifacts/contracts/mock/USDC.sol/USDT.json");

async function main() {
let token;
let Admin;
let SuperAdmin;
[Admin, user1, user2] = await ethers.getSigners();
const USDCtoken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; 
SuperAdmin = "0x9b50a3232d53d21AF67734bBF1dd50317c495cdA";
// token = await new ethers.Contract(
// 	USDCtoken,
// 	erc20.abi,
// 	Admin
//   );
  const WhitelistAddress = ["0xf5c6a4414F1B954e31E45d9C8779FA606E99c4B9","0x52a3921dAE5CaA16F1646604dDFE69f2264A69D2","0x74d88C626f7FC84b9Da298D004243E0336D828e3","0x8E40817743a1c803cCA81ea08dDeeD6c9f76173F","0xE94436C05D604793a78D6cF17c0abFe4471E7B86","0x2067cA9Fd08e1C5FCe9Bd097168800cfcf16A1CA","0xfed257209796EeC486f2A1c0AF1B330857E463c4","0x49a1c3a4dBa6Db9745fE010943bf08FF8f27a360","0xCf1A584cfc18CEBf0808c6B2187B656aE5875643","0xB08e92D4a03784735a93251A64e145B350228C22",
"0xBd72A099D3eF1f89c51014eB79637d8f483fa593",
"0x9d70c7FC7e403b88ef65ea7581dd209314fCe6Df",
"0x7330D79b563fE7bB40748f4dc9540E5Ac6Dc3071",
"0x8C840a4abBe35B2a1DE9d193BC1c8c8262F9b691",
"0xA00BD4E07E7df2BdF746033aA3a18e365FDC338f",
"0x95D44296bfd6945256255Cf723FA6516b2a124a1",
"0xc9dFb7E1b90C7f1135c56bDC3D2f7F10c799ac1d",
"0x7905EBEa1f3550ccAC95b8da2ccdCC9B0ed96a51",
"0xa3A1aC93E66155eB2C1B261677308D3Bdcd2a20F",
"0x0804776972496b0b2304C70747Cd5C6Eb24Be175",
"0xB6ff53ba121192f7358698E57C6F0C111788c112",
"0x687a5F091de81ecE84Dd2D846bE316bd2BB3401c",
"0x5991364Ad146a885C80cF65f6Db8f3618e0CA64D",
"0xDeA8ad8E41afB018057Eb2Ea81C1395A7b40E8c4",
"0xC21B63b2CEEb8732E674c23F0C4a7E1627442d56",
"0x3Af0364094eE2333D2A3abD7280430d486101816",
"0xcCd9700EA5330E7625d2F9Bb0F7E07b812aE65c9 ",
"0xb9944A8636f37792dD681DB6db35a642BCd9bFC3",
"0xdBa7162b5906295094E668987A3E2B2e6c6a1c89",
"0x091f360e0cd720Ab8b95Cfd1837BCDaD8f2D324b",
"0x1D241a7432406580D81843Fa41063c6039373EFe",
"0x0AaF9f7F9aA7eE3727BD9c14F9779b7aF521Cc32",
"0x46DCeaf588C5a1A1759935dc07824ffA9f9a4891",
"0xD6A2b8CC5959F106841d5fB20b04a6b91cAe741c ",
"0xBdf19EFA3536aFe58800a45963FfeAF6B00244FF",
"0xAE6dA29ccdeEdEbf8af7d2A4f7D29EF47C1Bc0A8",
"0x96463f114bc57E8429B997161b3c5e0fa75303C6",
"0xE80cbe7e7A23304165ae7456e44767c7619a8298",
"0x20E2B976925d6d9A3C775D07416aF4b8DE4d4414","0xD6b75d2aF1D0A2cDf7de39A1B3A822622F1F7731",
"0x19B6219A2f2B86eBe75381d99C1Bf3091B961281","0x7852922aC4bBc4D3675C5638Ed5a790BcB25C486",
"0x22a8cd3a7a07527B3447eB42Db073342b36c1D49","0x4748d2884D948499FF3a9a42fE0581Ff8B144d1A",
"0x164e6126889CcCB9B92Bd0e15fA74f88baF8E730 ","0x81964e06cA51F7426F17c52485f9f5B0bA446F02",
"0xE1604440875B262d03deD78345b1FBd4D1Dd0448","0x014c7401D8dF892b68beDbF968A1F779FB5186a5",
"0x86c27807859624B5DaD00c67743A06ed33c8E6b5","0x9817C311F6897D30e372C119a888028baC879d1c","0x3CE75ACCAc8A648e1B2d405e3E14d8B2dA5f7656",
"0x49240B844ebf349B84e0626dC9d6521eBd1F4379","0x57Df3196cBCA4D99986A7dAbFf09e556F082aEe3",
"0x0eba75eAf11Fd571062DB6192a8470Ba9d9CFF23","0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7","0xf3673004F3b1C77271a3581244d2B69Df13346f1",
"0xeE9dfA08F8420749A4FA3668eB3AaDDb05a6206f","0x3cE192073f8E5dbedd0ba821ceb66230581fF18c",
"0xE3A9a11232f4D52786CA61f56bB7Fb01b00C80cd","0x6c43f11c53BD024a9053636e7e0201F8987C5061",
"0x344bF79A7370C9606fA7ea0f67bcb1a000125900","0x2597Aa6Aca8B1A354e400D85877d6b6c095D7096",
"0xa05d173f369263fb697e1a0e214b107b59237400","0x617cd3DB0CbF26F323D5b72975c5311343e09115","0x68a8bB406838f31fEe0aB89398355E71160fD11B","0x2c3b2B2325610a6814f2f822D0bF4DAB8CF16e16","0x30f9A9C1aA282508901b606DEA2D887D4dD072e8","0x98979Be841a5621339aAbE07CbdCcE8fd358591c",
"0xB8195AF23faf6A80EbFB3Cf56bd01BC9Cb25B1Fc","0x4E0A9B846175f56c9226e55edfb495AD7047495c","0x662947667AEDd19cE978b522170966E627Fbee1E","0xe476A820A21950D29c6DF9b004DEa4Dd230a8BeD",
"0xC635dC7e540d384876aC4D6178D9971241b8383B",
"0xAa8FDD731815e001f3BEC719BBC1b096Deacce5f","0x5F8577BE43Fa17B4a6CF65b54Fd57273873Da8b7","0x7AB1e6f67059aE8b37a0dbeE76fED68362E2604C","0x5817945Df8982DA9c24b9F893BDac9F508f83A2D","0x2854CEfba4d6E7FD03D91807E774ae71Ef63e64E"]

// const investors = ["0xb2a2dddd6401abf70496f17a358305632e9eccff","0x6c43f11c53bd024a9053636e7e0201f8987c5061","0x40D377Cad33e2439d745245D2135755C6aD3cAaB","0xD9872Dc4ab698837b445AeF42F4Dc04d0BD16b46","0x2F65321aa08e38322Fdf3dDc129c8ccca6bAF85D","0xfA900ceB1e1c8DDBa60B18BbAceF58F3487c1780"]

// const amount = [20,10,50,20,25,25]

// const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli")
// //const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth")
// const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
// const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
// const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)
// console.log(priceFeed.address);
// priceFeed.latestRoundData()
//     .then((roundData) => {
//         // Do something with roundData
// 		console.log("Latest Round",roundData.answer );
// 		const hextoDecimal = hex => parseInt(hex,16);
//         console.log("Latest Round Data",hextoDecimal(roundData.answer._hex) );
//     })

  const BNFT = await hre.ethers.getContractFactory("BlossomingWeb3bridge");
  const BWNFT = await BNFT.deploy(USDCtoken, SuperAdmin,"https://gateway.pinata.cloud/ipfs/QmSQnZ3kN9sgcYMf3Y7Mgtqpf29ikhsKHCDzdqqzLhzd99","https://gateway.pinata.cloud/ipfs/QmWPxdWGw3g7gFgbRA8oFTg5C64rdcqZVGjRvSV9jSWzTW",200,1000);
  await BWNFT.deployed();
  console.log("BWNFT deployed to:", BWNFT.address);

//   await BWNFT.setWhitelistMintEnabled(true);

//  await BWNFT.connect(Admin).investorsWhitelistUsers(investors,amount);

// await BWNFT.connect(Admin).setWhitelistTrue([WhitelistAddress]);
	console.log("Successfull.....................")	
	
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
