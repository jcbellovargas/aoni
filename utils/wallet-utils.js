const { ethers } = require("ethers");

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
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const balance = await provider.getBalance(getSelectedAddress());
  const balanceInEth = ethers.utils.formatEther(balance);
  return balanceInEth

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