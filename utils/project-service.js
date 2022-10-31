const { ethers } = require("ethers");
import { getData } from "/utils/fetch-utils"
import { getProjectContractDetails } from '/utils/wallet-utils';

export const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const mockCurrentBalance = (project) => {
  const amount = parseInt(project.fundingGoal.amount * randomNumber(0.1, 0.9))
  return { token: "USDT", amount: amount }
}

export const mockfundingGoalProgress = (project) => {
  const progress = parseInt((project.currentBalance.amount / project.fundingGoal.amount) * 100)
  if (progress >= 100){
    return 100;
  } else {
    return progress;
  }
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
  project.currentBalance = parseContractAmount(projectContractDetails.currentBalance, projectTokenSymbol);
  project.totalContributions = parseContractAmount(projectContractDetails.totalContributions, projectTokenSymbol);
  project.fundingGoalProgress = parseFundingGoalProgress(projectContractDetails.fundingGoal, project.totalContributions);
  project.remainingDays = parseRemainingDays(projectContractDetails.deadline);
  project.donationsAmount = parseDonationsAmount(projectContractDetails.donationsAmount);
  project.status = projectContractDetails.status;
  return project;
}

const parseContractAmount = (contractBalance, tokenSymbol) => {
  const balanceAmount = parseInt(ethers.utils.formatEther(contractBalance));
  return { token: tokenSymbol, amount: balanceAmount };
}

const parseFundingGoalProgress = (contractFundingGoal, totalContributions) => {
  const fundingGoalAmount = parseInt(ethers.utils.formatEther(contractFundingGoal));
  const progress = (totalContributions.amount / fundingGoalAmount) * 100;
  if (progress >= 100){
    return 100;
  } else {
    return parseFloat(progress.toFixed(1));
  }
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

export const getProjectsByUser = async (userId) => {
  const response = await getData('/api/get_user_projects', {
    user: userId
  })
  for (const project of response.projects) {
    const contractDetails = await getProjectContractDetails(project.contract);
    decorateProjectData(project, contractDetails);
  };
  return response;
}

export const getProjectsByTag = async (tag) => {
  const response = await getData('/api/get_tag_projects', {
    tag: tag
  })
  for (const project of response.projects) {
    const contractDetails = await getProjectContractDetails(project.contract);
    decorateProjectData(project, contractDetails);
  };
  return response;
}