const { ethers } = require("ethers");

export const authWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  let accounts = await provider.send("eth_requestAccounts", []);
  let account = accounts[0];
  provider.on('accountsChanged', function (accounts) {
      account = accounts[0];
  });
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address
}

export const getBalance = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const balance = await provider.getBalance(address);
  debugger;
  return balance
}

export const scrubAddress = (address) => {
  return (address.slice(0, 3) + "..." + address.slice(-4))
}

export const selectedAddress = () => {
  return window.ethereum.selectedAddress
}