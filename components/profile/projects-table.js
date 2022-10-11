import ProjectsTableRow from "./projects-table-row"

export default function ProjectsTable(props) {
  return(
    <div className="overflow-x-auto w-full mt-10">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Estado</th>
            <th>Recaudacion</th>
            <th>Tiempo Restante</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ProjectsTableRow/>
          <ProjectsTableRow/>
          <ProjectsTableRow/>
          <ProjectsTableRow/>
        </tbody>
        
      </table>
    </div>
  )
}