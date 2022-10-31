const { ethers } = require("ethers");
import { getData } from "/utils/fetch-utils"
import { getProjectContractDetails } from '/utils/wallet-utils';
// import { decorateProjectData } from '/utils/project-service';

export const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const mockCurrentBalance = (project) => {
  const amount = parseInt(project.fundingGoal.amount * randomNumber(0.1, 0.9))
  return { token: "USDT", amount: amount }
}

export const mockfundingGoalProgress = (project) => {
  return parseInt((project.currentBalance.amount / project.fundingGoal.amount) * 100)
}

export const mockRemainingDays = (project) => {
  const now = new Date()
  const deadline = new Date(project.deadline)
  const timeRemaining = deadline.getTime() - now.getTime();
  const daysRemaining = timeRemaining / (1000 * 3600 * 24);
  return parseInt(daysRemaining)

}

export const mockDonationsAmount = () => {
  return parseInt(randomNumber(5,38))
}

export const decorateProjectData = (project, projectContractDetails) => {
  const projectTokenSymbol = project.fundingGoal.token;
  project.currentBalance = parseContractBalance(projectContractDetails.currentBalance, projectTokenSymbol);
  project.fundingGoalProgress = parseFundingGoalProgress(projectContractDetails.fundingGoal, project.currentBalance);
  project.remainingDays = parseRemainingDays(projectContractDetails.deadline);
  project.donationsAmount = parseDonationsAmount(projectContractDetails.donationsAmount);
  return project;
}

const parseContractBalance = (contractBalance, tokenSymbol) => {
  const balanceAmount = parseInt(ethers.utils.formatEther(contractBalance));
  return { token: tokenSymbol, amount: balanceAmount };
}

const parseFundingGoalProgress = (contractFundingGoal, currentBalance) => {
  const fundingGoalAmount = parseInt(ethers.utils.formatEther(contractFundingGoal));
  const progress = (currentBalance.amount / fundingGoalAmount) * 100;
  return parseInt(progress);
}

const parseRemainingDays = (contractDeadline) => {
  const deadlineTimestamp = ethers.utils.formatUnits(contractDeadline, 0);
  const timeRemaining = deadlineTimestamp - new Date().getTime();
  const daysRemaining = timeRemaining / (1000 * 3600 * 24);
  return Math.ceil(daysRemaining);
}

const parseDonationsAmount = (donations) => {
  return parseInt(ethers.utils.formatUnits(donations, 0));
}

export const getProject = async (id) => {
  const response = await getData('/api/get_project', { id: id });
  const contractDetails = await getProjectContractDetails(response.project.contract);
  const project = decorateProjectData(response.project, contractDetails);
  return project;
}