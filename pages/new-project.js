import { useSession } from "next-auth/react"

export default function NewProject(){
  const { data: session } = useSession({required: true})

  return(
    <>
      <div className="grid justify-items-center">
        { session && (
          <div className="card w-2/3 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{`Crea tu nuevo proyecto`}</h2>
              <div className="card-body">
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Nombre del proyecto</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Nombre" className="input input-bordered input-primary w-full" onChange={() => {}} />
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Descripcion</span>
                  </label>
                  <textarea className="textarea textarea-primary" placeholder="Detalles del proposito del proyecto y sus caracteristicas"></textarea>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Tipo de proyecto</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Categorias que definen al proyecto" className="input input-bordered input-primary w-full" onChange={() => {}} />
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Objetivo a recaudar (USDT)</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Monto objetivo en USDT" className="input input-bordered input-primary w-full" onChange={() => {}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Wallet address del proyecto</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Wallet en la que se cobraran las recaudaciones" className="input input-bordered input-primary w-full" onChange={() => {}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Fecha limite</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Fecha limite" className="input input-bordered input-primary w-full" onChange={() => {}}/>
                </div>

                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Imagen del proyecto</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Tamaño recomendado de 640x480" className="input input-bordered input-primary w-full" onChange={() => {}}/>
                </div>

                <div className="card-actions justify-end">
                  <button onClick={() => {}} className="btn btn-primary" disabled={false}>Crear Proyecto</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}