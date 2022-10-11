import { useSession } from "next-auth/react"
import ProfileStats from "../components/profile/profile-stats"
import ProjectsTable from "../components/profile/projects-table"
import ProjectsTableRow from "../components/profile/projects-table-row"


export default function Profile(props){

  const { data: session, status } = useSession({required: true})

  return(
    <>
      <div className="grid justify-items-center">
        { session && (
          <>
            <div className="card w-2/3 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{`Bienvenido ${session["user"]["name"]}!`}</h2>
                <ProfileStats/>
                <ProjectsTable/>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}