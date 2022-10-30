// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Deploy Tether
  const Tether = await ethers.getContractFactory('Tether');

  console.log('Deploying Tether...');
  const tether = await Tether.deploy();
  await tether.deployed();
  console.log(`Tether deployed to: ${tether.address}`)

  // Deploy AoniCrowfunding
  const AoniCrowfunding = await ethers.getContractFactory('AoniCrowfunding');

  console.log('Deploying AoniCrowfunding...');
  const aoniCrowfunding = await AoniCrowfunding.deploy(tether.address);
  await aoniCrowfunding.deployed();
  console.log(`AoniCrowfunding deployed to: ${aoniCrowfunding.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });