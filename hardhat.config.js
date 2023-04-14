require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

// Set up Alchemy provider
const { INFURA_API_KEY, ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;
const alchemyUrl = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;
const privateKey = PRIVATE_KEY.replace("0x", "");
const alchemyProvider = new ethers.providers.AlchemyProvider(alchemyUrl);
const wallet = new ethers.Wallet(privateKey, alchemyProvider);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337
    },
    alchemy: {
      url: alchemyUrl,
      accounts: [privateKey],
    },
  },
  ethers: {
    provider: alchemyProvider,
    accounts: [wallet],
  },
  sepolia: {
    url: "https://rpc.sepolia.network",
    accounts: [privateKey],
    gas: "auto",
    gasPrice: 50000000000 // 50 gwei
  }
};

ALCHEMY_API_KEY=<your Alchemy API key>
PRIVATE_KEY=<your private key></your>