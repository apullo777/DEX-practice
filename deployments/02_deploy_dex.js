const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying DEX with the account:", deployer.address);

  // Deploy the ERC20 token contract
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("My Token", "MTK");
  await token.deployed();

  // Deploy the DEX contract and pass the token address as constructor argument
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy(token.address);
  await dex.deployed();

  console.log("ERC20 token contract deployed to:", token.address);
  console.log("DEX contract deployed to:", dex.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});