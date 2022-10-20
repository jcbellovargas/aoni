import { useEffect, useState } from "react"
import { getData } from "/utils/fetch-utils"
import ProjectsTableRow from "./projects-table-row"

export default function ProjectsTable(props) {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const get_user_projects = async () => {
      try {
        const response = await getData('/api/get_user_projects', {
          user: props.user
        })
        if (response.error){
          console.log(error);
        }
        setProjects(response.projects)
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
          {projects.map((project) => {
            return (<ProjectsTableRow key={project.id} project={project}/>)
          })}
        </tbody>
        
      </table>
    </div>
  )
}