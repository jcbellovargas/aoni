// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Hardhat helper to get the ethers contractFactory object
  const Tether = await ethers.getContractFactory('Tether');

  // Deploy the contract
  console.log('Deploying Tether...');
  const tether = await Tether.deploy();
  await tether.deployed();
  console.log(`Tether deployed to: ${tether.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });