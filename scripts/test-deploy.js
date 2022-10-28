// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);


  const Tether = await ethers.getContractFactory('Tether');

  // Deploy the contract
  console.log('Deploying Tether...');
  const tether = await Tether.deploy();
  await tether.deployed();
  console.log(`Tether deployed to: ${tether.address}`)

  // Hardhat helper to get the ethers contractFactory object
  const TestContract = await ethers.getContractFactory('TestContract');

  // Deploy the contract
  console.log('Deploying TestContract...');
  const testContract = await TestContract.deploy(tether.address);
  await testContract.deployed();
  console.log(`TestContract deployed to: ${testContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });