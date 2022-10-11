import { useSession } from "next-auth/react"
import ProjectsTable from "../components/projects-table"


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
                <div className="card-actions justify-end">
                </div>
                <div className="stats shadow">
  
                  <div className="stat place-items-center">
                    <div className="stat-title">Proyectos</div>
                    <div className="stat-value">3</div>
                  </div>
                  
                  <div className="stat place-items-center">
                    <div className="stat-title">Total Recaudado</div>
                    <div className="stat-value text-secondary">4,200 USDT</div>
                  </div>
                  
                  <div className="stat place-items-center">
                    <div className="stat-title">Donaciones totales</div>
                    <div className="stat-value">27</div>
                  </div>
                  
                </div>
                <ProjectsTable/>
              </div>
            </div>
            
            
          </>
        )}
      </div>
    </>
  )
}