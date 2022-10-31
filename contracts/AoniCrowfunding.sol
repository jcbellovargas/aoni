// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AoniProject.sol";

contract AoniCrowfunding {
  IERC20 private token;
  AoniProject[] projects;

  event ProjectCreated(address);

  constructor(address _tokenAddress) {
    token = IERC20(_tokenAddress);
  }

  function createProject(
    uint fundingGoal,
    uint deadline,
    address projectOwner
  ) external returns(address){
    AoniProject project = new AoniProject(fundingGoal, deadline, projectOwner, address(token));
    projects.push(project);
    emit ProjectCreated(address(project));
    return address(project);
  }

  function getAllProjects() external view returns(AoniProject[] memory) {
    return projects;
  }

}