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

export const isWalletConnected = () => {
  return !!getSelectedAddress()
}