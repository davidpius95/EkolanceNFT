require("@nomicfoundation/hardhat-toolbox");

module.exports = {
	networks: {
	  hardhat: {
		forking: {
		  url: "https://eth-mainnet.g.alchemy.com/v2/GcxC-neAeTU3S9lx3d3gT7mKiDMJ7Owo", // mainnet ethereum
		  // blockNumber: 11095000
		}
	  },
	  gorli: {
		url:"https://eth-goerli.g.alchemy.com/v2/muH7MzWar843GZ2gtk8FXStcUrHIwItM",
		accounts: [process.env.PRIVATE_KEY_GORLI]
	  },
	  ethereum: {
		url:"https://eth-mainnet.g.alchemy.com/v2/GcxC-neAeTU3S9lx3d3gT7mKiDMJ7Owo",
		accounts: [process.env.PRIVATE_KEY_MAINNET]
	  }
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: "D4IHW4RYKMDR178WCWH4XZZAW2ET4H86M7"
	  },
	solidity: {
	  version: "0.8.4",
	  settings: {
		optimizer: {
		  enabled: true,
		  runs: 200
		}
	  }
	},
	
	paths: {
	  sources: "./contracts",
	  tests: "./test",
	  cache: "./cache",
	  artifacts: "./artifacts"
	},
	mocha: {
	  timeout: 40000
	}
  }