// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AoniProject {

  enum Status { ACTIVE, CANCELLED, FINISHED }

  uint private fundingGoal;
  uint private donationsAmount;
  uint private deadline;
  Status private status;
  address private projectOwner;

  mapping(address => uint) contributions;
  address[] contributors;
  IERC20 fundingToken;

  constructor(
    uint _fundingGoal,
    uint _deadline,
    address _projectOwner,
    address _fundingTokenAddress
  ) {
    fundingGoal = _fundingGoal;
    deadline = _deadline;
    projectOwner = _projectOwner;
    donationsAmount = 0;
    status = Status.ACTIVE;
    fundingToken = IERC20(_fundingTokenAddress);
  }

  function getFundingGoal() public view returns(uint) {
    return fundingGoal;
  }

  function getCurrentBalance() public view returns(uint) {
    return fundingToken.balanceOf(address(this));
  }

  function getDonationsAmount() external view returns(uint) {
    return donationsAmount;
  }

  function getDeadline() public view returns(uint) {
    return deadline;
  }

  function getStatus() external view returns(string memory) {
    if (status == Status.CANCELLED) return ("CANCELLED");
    if (status == Status.ACTIVE) return ("ACTIVE");
    if (status == Status.FINISHED) return ("FINISHED");
    return "";
  }

  function getProjectOwner() external view returns(address) {
    return projectOwner;
  }

  function contribute(uint amount) external {
    require(status == Status.ACTIVE, "The project is no longer Active"); 
    require(fundingToken.balanceOf(msg.sender) >= amount, "Your token balance must be greater than your deposit amount");
    fundingToken.transferFrom(msg.sender, address(this), amount);
    if (contributions[msg.sender] == 0) {
      contributors.push(msg.sender);
    }
    contributions[msg.sender] += amount;
    donationsAmount++;
    checkFundingGoal();
  }

  function checkFundingGoal() public {
    if (getCurrentBalance() >= getFundingGoal()) finish();
  }

  function checkDeadline() public {
    if (block.timestamp >= getDeadline()) cancel();
  }

  function cashBackContributor(address contributor) internal {
    uint cashBackAmount = contributions[contributor];
    fundingToken.transfer(contributor, cashBackAmount);
    contributions[contributor] = 0;
  }

  function cashBackAll() internal {
    for (uint i; i < contributors.length; i++) {
      address contributor = contributors[i];
      cashBackContributor(contributor);
    }
  }

  function payProjectOwner() internal {
    fundingToken.transfer(projectOwner, getCurrentBalance());
  }

  function finish() public {
    payProjectOwner();
    status = Status.FINISHED;
  }

  function cancel() public {
    cashBackAll();
    status = Status.CANCELLED;
  }

  function getContributionsFrom(address from) view external returns(uint) {
    return contributions[from];
  }

}