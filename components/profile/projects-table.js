import ProjectsTableRow from "./projects-table-row"

export default function ProjectsTable(props) {

  return(
    <div className="overflow-x-auto w-full mt-10">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th>Wallet</th>
            <th>Contract</th>
            <th>Donations</th>
            <th>Funding</th>
            <th>Remaining Time</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.projects.map((project) => {
            return (<ProjectsTableRow key={project.id} project={project}/>)
          })}
        </tbody>
      </table>
    </div>
  )
}
