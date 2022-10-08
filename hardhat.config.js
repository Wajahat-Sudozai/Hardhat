require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("hardhat-gas-reporter");
require('solidity-coverage');
// console.log("Binance :",process.env.BINANCE_TESTNET_PRIVATE_KEY)

const ETHEREUM__TESTNET_RPC_URL= process.env.ETHEREUM__TESTNET_RPC_URL;
const ETHEREUM_TESTNET_PRIVATE_KEY= process.env.ETHEREUM_TESTNET_PRIVATE_KEY;
const POLYGON__TESTNET_RPC_URL= process.env.POLYGON__TESTNET_RPC_URL;
const POLYGON_TESTNET_PRIVATE_KEY= process.env.POLYGON_TESTNET_PRIVATE_KEY;
const BINANCE__TESTNET_RPC_URL= process.env.BINANCE__TESTNET_RPC_URL;
const BINANCE_TESTNET_PRIVATE_KEY= process.env.BINANCE_TESTNET_PRIVATE_KEY;
const GOERLI__TESTNET_RPC_URL=process.env.GOERLI__TESTNET_RPC_URL;
const GOERLI_TESTNET_PRIVATE_KEY=process.env.GOERLI_TESTNET_PRIVATE_KEY;



task("accounts", "Prints the list of accounts", async () => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  mocha: {
    timeout: 10000000000,
  },
  // skipFiles: ['ERC721.sol'],
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true:false,
    currency: 'USD',
  },
  solidity:"0.8.7",
  networks: {
    rinkeby: {
      url: ETHEREUM__TESTNET_RPC_URL,
      accounts: [ETHEREUM_TESTNET_PRIVATE_KEY],
      chainId:4,
    },
    goerli: {
      url: GOERLI__TESTNET_RPC_URL,
      accounts: [GOERLI_TESTNET_PRIVATE_KEY],
      chainId:5,
    },
    polygon: {
      url: POLYGON__TESTNET_RPC_URL,
      accounts: [POLYGON_TESTNET_PRIVATE_KEY],
      chainId:80001,
    },
    binance: {
      url: BINANCE__TESTNET_RPC_URL,
      accounts: [BINANCE_TESTNET_PRIVATE_KEY],
      chainId:97,
    },
    
  },
  
};
