const { ethers } = require("hardhat");

async function main() {
  // Get the deployed DEX and token contracts
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy();

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("My Token", "MTK");

  // Print contract addresses for reference
  console.log("DEX contract deployed to:", dex.address);
  console.log("Token contract deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
