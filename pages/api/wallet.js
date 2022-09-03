const { ethers } = require("ethers");

export default async function handler(req, res) {
  // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // // Prompt user for account connections
  // await provider.send("eth_requestAccounts", []);
  // const signer = provider.getSigner();
  // console.log("Account:", await signer.getAddress());
  // res.status(200).json({ account: await signer.getAddress() })


  res.status(200).json({ name: 'jorsdsge' })
  
}