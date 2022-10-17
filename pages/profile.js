import { useSession } from "next-auth/react"
import ProfileEdit from "../components/profile/profile-edit"
import ProfileStats from "../components/profile/profile-stats"
import ProjectsTable from "../components/profile/projects-table"


export default function Profile(){
  const { data: session } = useSession({required: true})

  return(
    <>
      <div className="grid justify-items-center mb-10">
        { session && (
          <>
            <div className="card w-2/3 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{`Bienvenido ${session["user"]["name"]}!`}</h2>
                <ProfileStats/>
                <ProjectsTable/>
                <ProfileEdit session={session}/>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}