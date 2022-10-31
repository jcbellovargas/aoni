// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Deploy AoniCrowfunding
  const AoniCrowfunding = await ethers.getContractFactory('AoniCrowfunding');

  console.log('Deploying AoniCrowfunding...');
  const aoniCrowfunding = await AoniCrowfunding.deploy(process.env.NEXT_PUBLIC_TETHER_CONTRACT_ADDRESS);
  await aoniCrowfunding.deployed();
  console.log(`AoniCrowfunding deployed to: ${aoniCrowfunding.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });