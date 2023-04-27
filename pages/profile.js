import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ProfileEdit from "../components/profile/profile-edit"
import ProfileStats from "../components/profile/profile-stats"
import ProjectsTable from "../components/profile/projects-table"
import { getProjectsByUser } from '../utils/project-service';


export default function Profile(){
  const { data: session } = useSession({required: true});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!session) return;
    const get_user_projects = async () => {
      try {
        const response = await getProjectsByUser(session.user.id);
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
            <div className="card w-3/4 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{`Welcome ${session.user.name}!`}</h2>
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