const { ethers } = require("ethers");
const TETHER_CONTRACT_ABI = require("/artifacts/contracts/Tether.sol/Tether.json");
const TETHER_CONTACT_ADDRESS = '0xD19230e27095C33C4F722E7E420AFF190e5F2553'; // Goerli testnet contract


export const getUSDTContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const contract = new ethers.Contract(TETHER_CONTACT_ADDRESS, TETHER_CONTRACT_ABI.abi, provider);
  return contract
}

export const authWallet = async () => {
  const signer = await getEthSigner();
  const address = await signer.getAddress();
  return address
}

export const getEthSigner = async() => {
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

export const sendEth = async (amount, to) => {
  const signer = await getEthSigner();
  debugger;
  const tx = signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount)
  });
  console.log(tx)
}