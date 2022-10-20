import { useEffect } from "react"
import { getData } from "/utils/fetch-utils"
import ProjectsTableRow from "./projects-table-row"

export default function ProjectsTable(props) {

  useEffect(() => {
    const get_user_projects = async () => {
      try {
        const response = await getData('/api/get_user_projects', {
          user: props.user
        })
        console.log(JSON.stringify(response.projects))
        if (response.error){
          // showError(`Hubo un error al crear el proyecto: \n${error}`);
        }
      } catch(error) {
        console.log(error);
      }
    }
    get_user_projects()
  },[])

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