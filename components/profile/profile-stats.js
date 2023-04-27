export default function ProfileStats(props) {

  const totalFundingAmount = (projects) => {
    return projects.reduce((sum, project) => sum + project.totalContributions.amount, 0)
  }

  const totalDonationsAmount = (projects) => {
    return projects.reduce((sum, project) => sum + project.donationsAmount, 0)
  }

  return(
    <div className="stats shadow-lg mt-4">
  
      <div className="stat place-items-center">
        <div className="stat-title">Projects</div>
        <div className="stat-value">{props.projects.length}</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Total Funded</div>
        <div className="stat-value text-secondary">{`${totalFundingAmount(props.projects)} USDT`} </div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Total Donations</div>
        <div className="stat-value">{totalDonationsAmount(props.projects)}</div>
      </div>
    
    </div>
  )
}
