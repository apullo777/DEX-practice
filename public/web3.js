// Initialize Web3 with provider from MetaMask
let web3 = new Web3(window.ethereum);

// Get the deployed contract instances
let dexContract = new web3.eth.Contract(dexAbi, dexAddress);
let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);

// Get the user's account details
let account;

async function getAccount() {
  const accounts = await web3.eth.getAccounts();
  account = accounts[0];
  console.log("Connected account:", account);
}

// Connect to MetaMask on page load
window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await getAccount();
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    await getAccount();
  }
  // Non-dapp browsers...
  else {
    console.log('No Web3 provider detected');
  }
});

// Example function to buy tokens on the DEX
async function buyTokens(tokenAmount, etherAmount) {
  // Get the token balance of the user
  let tokenBalance = await tokenContract.methods.balanceOf(account).call();

  // Approve the DEX contract to spend tokens on user's behalf
  await tokenContract.methods.approve(dexAddress, tokenAmount).send({ from: account });

  // Buy tokens on the DEX
  await dexContract.methods.buyTokens(tokenAmount, etherAmount).send({ from: account });

  // Check the updated token balance
  let newTokenBalance = await tokenContract.methods.balanceOf(account).call();
  console.log("Token balance:", tokenBalance, "->", newTokenBalance);
}
