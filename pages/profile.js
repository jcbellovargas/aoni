import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ProfileEdit from "../components/profile/profile-edit"
import ProfileStats from "../components/profile/profile-stats"
import ProjectsTable from "../components/profile/projects-table"
import { getData } from "/utils/fetch-utils"
import { getProjectContractDetails } from '/utils/wallet-utils';
import { decorateProjectData } from '/utils/project-service';


export default function Profile(){
  const { data: session } = useSession({required: true});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!session) return;
    const get_user_projects = async () => {
      try {
        const response = await getData('/api/get_user_projects', {
          user: session.user.id
        })
        for (const project of response.projects) {
          const contractDetails = await getProjectContractDetails(project.contract);
          decorateProjectData(project, contractDetails);
        };
        setProjects(response.projects)
      } catch(error) {
        console.log(error);
      }
    }
    get_user_projects()
  },[session])

  return(
    <>
      <div className="grid justify-items-center mb-10">
        { session && (
          <>
            <div className="card w-2/3 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{`Bienvenido ${session.user.name}!`}</h2>
                <ProfileStats projects={projects}/>
                <ProjectsTable projects={projects} user={session.user}/>
                <ProfileEdit session={session}/>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}