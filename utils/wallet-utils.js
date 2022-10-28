const { ethers } = require("ethers");
const TETHER_CONTRACT_ABI = require("/artifacts/contracts/Tether.sol/Tether.json").abi;
// const TETHER_CONTRACT_ADDRESS = '0xD19230e27095C33C4F722E7E420AFF190e5F2553'; // Goerli testnet contract
const TETHER_CONTRACT_ADDRESS = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'; // localhost contract

const TESTCONTRACT_CONTRACT_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // localhost contract
const TESTCONTRACT_CONTRACT_ABI = require("/artifacts/contracts/TestContract.sol/TestContract.json").abi;


export const getContract = async (address, abi ) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const contract = new ethers.Contract(address, abi, provider.getSigner());
  return contract
}

export const getUSDTContract = async () => {
  return getContract(TETHER_CONTRACT_ADDRESS, TETHER_CONTRACT_ABI);
}

export const getDepositContract = async () => {
  return getContract(TESTCONTRACT_CONTRACT_ADDRESS, TESTCONTRACT_CONTRACT_ABI);
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

export const sendDepositTransaction = async (amount) => {
  const depositContract = await getDepositContract();
  const usdtContract = await getUSDTContract();
  const decimals = await usdtContract.decimals();
  const sendAmount = ethers.utils.parseUnits(amount, decimals);
  let tx;
  try {
    tx = await depositContract.deposit(sendAmount);
  } catch(error){
    tx = error.transaction
  }
  return tx;
}

export const sendApproveSpenderTransaction = async (amount) => {
  const spender = TESTCONTRACT_CONTRACT_ADDRESS;
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

export const getTokenSymbol = async () => {
  const contract = await getUSDTContract();
  const symbol = await contract.symbol();
  return symbol
}
