const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying ERC20 token with the account:", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("My Token", "MTK");

  console.log("ERC20 token contract address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
