const { ethers } = require("ethers");

const TETHER_CONTRACT_ABI = require("/artifacts/contracts/Tether.sol/Tether.json").abi;
// const TETHER_CONTRACT_ADDRESS = '0xD19230e27095C33C4F722E7E420AFF190e5F2553'; // Goerli testnet contract
const TETHER_CONTRACT_ADDRESS = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'; // localhost contract

const AONICROWFUNDING_CONTRACT_ADDRESS = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'; // localhost contract
const AONICROWFUNDING_CONTRACT_ABI = require("/artifacts/contracts/AoniCrowfunding.sol/AoniCrowfunding.json").abi;

export const getContract = async (address, abi ) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const contract = new ethers.Contract(address, abi, provider.getSigner());
  return contract
}

export const getUSDTContract = async () => {
  return getContract(TETHER_CONTRACT_ADDRESS, TETHER_CONTRACT_ABI);
}

// export const getDepositContract = async () => {
//   return getContract(TESTCONTRACT_CONTRACT_ADDRESS, TESTCONTRACT_CONTRACT_ABI);
// }

export const getAoniCrowfundingContract = async () => {
  return getContract(AONICROWFUNDING_CONTRACT_ADDRESS, AONICROWFUNDING_CONTRACT_ABI);
}

export const authWallet = async () => {
  const signer = await getEthSigner();
  const address = await signer.getAddress();
  return address
}

export const getEthSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  let accounts = await provider.send("eth_requestAccounts", []);
  let account = accounts[0];
  provider.on('accountsChanged', function (accounts) {
    account = accounts[0];
  });
  return provider.getSigner();
}

export const scrubAddress = (address) => {
  return (address.slice(0, 3) + "..." + address.slice(-4))
}

export const getSelectedAddress = () => {
  return window.ethereum.selectedAddress
}

export const getScrubbedSelectedAddress = () => {
  const address = getSelectedAddress()
  if (!!!address) return;
  return scrubAddress(address)
}

export const getBalance = async () => {
  const usdtContact = await getUSDTContract();
  const ownerBalance = await usdtContact.balanceOf(getSelectedAddress());
  const balanceDecimals = await usdtContact.decimals()
  return ethers.utils.formatUnits(ownerBalance, balanceDecimals)
}

// export const sendDepositTransaction = async (amount) => {
//   const depositContract = await getDepositContract();
//   const usdtContract = await getUSDTContract();
//   const decimals = await usdtContract.decimals();
//   const sendAmount = ethers.utils.parseUnits(amount, decimals);
//   let tx;
//   try {
//     tx = await depositContract.deposit(sendAmount);
//   } catch(error){
//     tx = error.transaction
//   }
//   return tx;
// }

// export const sendWithdrawTransaction = async (amount) => {
//   const depositContract = await getDepositContract();
//   const usdtContract = await getUSDTContract();
//   const decimals = await usdtContract.decimals();
//   const withdrawAmount = ethers.utils.parseUnits(amount, decimals);
//   let tx;
//   try {
//     tx = await depositContract.withdraw(withdrawAmount);
//   } catch(error){
//     tx = error.transaction
//   }
//   return tx;
// }

export const sendApproveSpenderTransaction = async (amount) => {
  const spender = AONICROWFUNDING_CONTRACT_ADDRESS;
  const contract = await getUSDTContract();
  const decimals = await contract.decimals();
  const sendAmount = ethers.utils.parseUnits(amount, decimals)
  let tx;
  try {
    tx = await contract.approve(spender, sendAmount);
    tx.wait();
  } catch(error){
    tx = error.transaction
  }
  return tx;
}

export const deployProjectContract = async (fundingGoal, deadline, ownerAddress) => {
  const aoniCrowfundingContract = await getAoniCrowfundingContract();
  const usdtContract = await getUSDTContract();
  const decimals = await usdtContract.decimals();
  const goalAmount = ethers.utils.parseUnits(fundingGoal, decimals);
  let tx;
  let projectAddress;
  try {
    tx = await aoniCrowfundingContract.createProject(goalAmount, deadline.getTime(), ownerAddress);
    const transactionReceipt = await tx.wait();
    projectAddress = transactionReceipt.events.find(event => event.event === 'ProjectCreated').args[0];
  } catch(error){
    tx = error.transaction
  }
  return projectAddress;
}

export const getTokenSymbol = async () => {
  const contract = await getUSDTContract();
  const symbol = await contract.symbol();
  return symbol
}
